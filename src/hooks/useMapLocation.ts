import { useEffect, useState } from "react"; 
import { useMap } from "../global-state/useMapStore";


interface LatLngLiteral {
    lat: number;
    lng: number;
}

const useMapLocation = () => {

    const [loading, setLoading] = useState(true)
    const API_KEY = import.meta.env.VITE_APP_MAP_KEY

    const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(null);

    const { address, updateMarker, marker } = useMap((state) => state); 

    // Function to fetch geolocation from the address
    const fetchGeolocation = async (address: string) => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location; 

            setMarkerPosition({
                lat: lat,
                lng: lng,
            })
            setLoading(false)
            updateMarker({
                lat: lat,
                lng: lng,
            })
            // setDirectionsResponse({ lat, lng });
        }
    };

    useEffect(()=> {
        if(address){
            fetchGeolocation(address)
        }
    }, [address]) 

    return {
        loading,
        markerPosition,
        setMarkerPosition,
        marker
    };
}

export default useMapLocation