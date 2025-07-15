import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useMap } from '../../../global-state/useMapStore';
import { CustomButton } from '..';
import MapSearch from './map_search';


interface LatLngLiteral {
    lat: number;
    lng: number;
}

interface Props {
    setOpen?: (open: boolean) => void;
    latlng?: any;
}

const libraries: ("places")[] = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '60vh',
};

const defaultCenter: LatLngLiteral = {
    lat: 37.7749,
    lng: -122.4194,
};

const API_KEY = import.meta.env.VITE_APP_MAP_KEY;

const MapWithClickMarker = ({ setOpen, latlng }: Props) => {
    const { updateMap, updateMarker } = useMap((state) => state);

    const [zoom, setZoom] = useState(12);
    const [location, setLocation] = useState<LatLngLiteral | any>(latlng.lat ? latlng : {} as any);
    const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | any>(latlng.lat ? latlng : {} as any);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries,
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }: LatLngLiteral) => {
        mapRef.current?.panTo({ lat, lng });
        mapRef.current?.setZoom(16);
    }, []);

    // Setup initial marker and center
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const current = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setLocation(current);
                //   setMarkerPosition(current); 
                setZoom(16);
            },
            () => {
                setLocation(defaultCenter);
                //   setMarkerPosition(defaultCenter)
                setZoom(12);
            }
        );
    }, []);

    console.log(latlng);


    useEffect(() => {
        const timer = setTimeout(() => {

            if (latlng.lat) {
                setLocation(latlng)
                setMarkerPosition(latlng)
            }
            console.log("working");
            
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

    // console.log(markerPosition);


    const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        const clickedLat = event.latLng?.lat();
        const clickedLng = event.latLng?.lng();

        if (!clickedLat || !clickedLng) return;

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: { lat: clickedLat, lng: clickedLng } }, (results: any, status) => {
            if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                updateMap(address);
            } else {
                console.error('Error fetching address:', status);
            }
        });

        const newPos = { lat: clickedLat, lng: clickedLng };
        // panTo(newPos);
        setMarkerPosition(newPos);
        // updateMarker(newPos);
    }, [updateMap]);

    const clickHandler = () => {
        updateMarker(markerPosition)
        setOpen?.(false)
    }

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div className='w-full flex justify-center items-center'>Loading maps...</div>;

    return (
        <div className='mt-1'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={latlng.lat ? 16 : zoom}
                onLoad={onMapLoad}
                options={{ disableDefaultUI: true, zoomControl: true }}
                center={location}
                onClick={onMapClick}
            >
                <MapSearch center={location} panTo={panTo} />
                {markerPosition?.lat && (
                    <Marker title='marker' position={{ lat: markerPosition?.lat, lng: markerPosition.lng }} />
                )}
                {/* {(markerPosition && !isNaN(markerPosition.lat) && !isNaN(markerPosition.lng)) && <Marker position={{ lat: Number(markerPosition.lat), lng: Number(markerPosition.lng) }} />} */}
            </GoogleMap>

            <div className='w-full bg-white flex justify-end py-3 px-4'>
                <CustomButton onClick={() => clickHandler()} ml="auto" width="150px">
                    Okay
                </CustomButton>
            </div>
        </div>
    );
};

export default MapWithClickMarker;
