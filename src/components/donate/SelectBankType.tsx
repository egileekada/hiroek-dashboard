
import { useState } from 'react'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'; 

interface Obj {
    name: string; 
}

export default function SelectBankType({value, options, setValue }: { value: string, setValue: any, options: Array<Obj> }) {
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isOpen, setIsOpen] = useState(false);  

    const handleOptionClick = (option: any) => { 
        setValue(option?.name);  
        setSearchTerm("")
        setIsOpen(false);
    }; 

    const filteredOptions = options.filter((option: any) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=' relative rounded-[10px] border-[0.5px] border-[#37137F80] w-full h-[45px] ' >
            <div
                className=' w-full relative font-medium ' 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '10px',
                    paddingRight: "0px",
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    cursor: 'pointer'
                }} 
            >
                {value ? value : 'Select Bank'}
                <div className=' w-10 flex absolute h-full top-0 right-0 justify-center items-center ' >
                    {!isOpen ?
                        <IoChevronDown size={"20px"} />
                        :
                        <IoChevronUp size={"20px"} />
                    }
                </div>
            </div>
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '110%',
                        left: '0',
                        right: '0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        zIndex: 1000
                    }}
                >
                    <div className=' w-full flex justify-center py-2 ' >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            className=' outline-none font-medium '
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '90%',
                                padding: '10px',
                                boxSizing: 'border-box',
                                border: '1px solid #ccc',
                                borderRadius: "8px"

                            }}
                        />
                    </div>
                    <div className=' flex flex-col max-h-[200px] overflow-y-auto font-medium text-sm ' >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.name}
                                    onClick={() => handleOptionClick(option)}
                                    style={{
                                        padding: '10px',
                                        cursor: 'pointer',
                                        borderTop: '1px solid #ccc'
                                    }}
                                >
                                    {option.name}
                                </div>
                            ))
                        ) : (
                            <div className=' w-full justify-center p-[10px] border border-[#ccc] ' >No options found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
