import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import useMapLocation from '../../../hooks/useMapLocation';
import { useMap } from '../../../global-state/useMapStore';
import { CustomButton } from '..';
import MapSearch from './map_search';
import React from 'react';

// Define types for Google Map props and objects
interface LatLngLiteral {
    lat: number;
    lng: number;
}

interface Props {
    setOpen?: any,
}

const libraries: ("places")[] = ['places']; // Libraries to load for Google Maps

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter: LatLngLiteral = {
    lat: 37.7749, // Default latitude (San Francisco)
    lng: -122.4194 // Default longitude (San Francisco)
};

const API_KEY = import.meta.env.VITE_APP_MAP_KEY

const MapWithClickMarker = (props: Props) => {

    const {
        setOpen,
    } = props

    const { updateMap } = useMap((state) => state);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries,
    });


    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const { markerPosition: newMarker, loading } = useMapLocation()

    useEffect(() => {
        if (newMarker?.lat) {
            setLocation({
                lat: newMarker?.lat,
                lng: newMarker?.lng,
            })
            setMarkerPosition({
                lat: newMarker?.lat,
                lng: newMarker?.lng,
            })
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude ? position.coords.latitude : 37.7749,
                        lng: position.coords.longitude ? position.coords.longitude : -122.4194,
                    });
                },
                () =>
                    setLocation({
                        lat: 37.7749,
                        lng: -122.4194,
                    })

            );
        }
        setZoom(16)
    }, [loading])

    const mapRef: any = React.useRef();
    const onMapLoad = React.useCallback((map: any) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }: any) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);


    //   const { loadingMap, center, setMarkerPosition, markerPosition } = useMapLocation()
    const [zoom, setZoom] = useState(12); // Default map center
    const [location, setLocation] = useState<LatLngLiteral>(defaultCenter); // Default map center
    const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(null); // Marker position state


    // Handle map click event to place marker
    const handleMapClick = (event: any) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
            { location: { lat: event.latLng.lat(), lng: event.latLng.lng() } },
            (results: any, status: any) => {
                if (status === 'OK' && results[0]) {

                    let address = results[0].formatted_address 
                    updateMap(address)

                } else {
                    console.error('Error fetching address:', status);
                }
            }
        );
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
        setMarkerPosition({ lat: clickedLat, lng: clickedLng });
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded && loading) return <div className=' w-full flex justify-center items-center ' >Loading maps...</div>;



    return (
        <div>

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                onLoad={onMapLoad}
                options={options}
                center={location}
                onClick={(e) => handleMapClick(e)} // Add the onClick handler here
            >
                <MapSearch setMarker={setMarkerPosition} center={location} panTo={panTo} />
                {markerPosition && (
                    <Marker position={markerPosition} /> // Render the marker at the clicked position
                )}
            </GoogleMap>
            <div className=' w-full bg-white flex justify-end py-3 px-4 '  >
                <CustomButton onClick={() => setOpen(false)} ml={"auto"} width={"150px"}>
                    Okay
                </CustomButton>
            </div>
        </div>
    );
};

export default MapWithClickMarker
