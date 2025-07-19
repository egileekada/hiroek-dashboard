
import React from 'react'
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";  
import { useMap } from '../../../../global-state/useMapStore'; 

interface Props {
    center: any,
    panTo: any,
    setMarker: any, 
}

function MapSearch(props: Props) {
    let {
        center,
        panTo,
        // setMarker, 
    } = props 

    const { updateMap, updateMarker } = useMap((state) => state);
    const [show, setShow] = React.useState(false)

    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: new google.maps.LatLng(center),
            radius: 100 * 1000,
        },
    }); 

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (item: string) => {
        // updateMap(item)
        setValue(item);
        if (item === '') {
            setShow(false)
        } else {
            setShow(true)
        }
    };

    const handleSelect = async (address: any) => {
        setValue(address, false);
        setShow(false)
        clearSuggestions();
        updateMap(address)
        try {
            const results: any = await getGeocode({ address });
            const { lat, lng } =  getLatLng(results[0]);
            panTo({ lat, lng });  

            // updateMap(results[0]?.formatted_address)
            updateMarker({
                lat: Number(lat),
                lng: Number(lng)
            })
            // setMarker({
            //     lat: Number(lat),
            //     lng: Number(lng),
            // })
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className=' w-full mt-4 flex justify-center '  >
            <div className=' relative w-[70%] h-[45px] z-20 rounded-md ' >

                <div className=' w-full h-[45px] relative '  > 
                    <div className=' w-full relative z-20 bg-white rounded-md ' > 
                        <input type={"search"} style={{ borderRadius: "5px" }} onChange={(e)=> handleInput(e.target?.value)} placeholder={"Search your location"} value={value}className={` h-[39px] px-3 border-[#37137F] border-opacity-30 border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] bg-transparent w-full text-sm font-medium text-primary `} />
                    </div>
                    {show && (
                        <div className=' w-full max-h-[250px] bg-white overflow-y-auto z-20 px-4 flex flex-col items-start py-2 rounded-md absolute mt-2 ' >
                            {/* <SearchComponent home={home} /> */}
                            {status !== "OK" && (
                                <div className=' w-full items-center py-2 ' >
                                    Loading...
                                </div>
                            )}
                            {status === "OK" &&
                                data.map((item: { description: string }, index: any) => {
                                    return (
                                        <button onClick={() => handleSelect(item?.description)} className=' w-full text-center py-2 ' key={index} >
                                            {item?.description?.length > 50 ? item?.description?.substring(0, 50) + "..." : item?.description}
                                        </button>
                                    )
                                })}
                        </div>
                    )}
                    {show && (
                        <div className=' bg-black bg-opacity-30 z-10 fixed inset-0 ' onClick={() => setValue("")} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MapSearch
