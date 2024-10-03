import Select from 'react-select';
import { useInterest } from '../../global-state/useInterestData';
import { useEffect, useState } from 'react';

interface IProps {
    changeHandler?: (by: string) => void;
    interest?: Array<{
        value: string,
        label: string
    }>;
    placeholder: string,
    name: string,
    value: Array<any>
}

export default function MultipleSelect(props: IProps) {

    const {
        placeholder,
        interest,
        value
    } = props

    const [defaultData, setDefaultData] = useState<Array<{
        value: string,
        label: string
    }>>([])

    const { updateInterest } = useInterest((state) => state)

    const handler = (item: any) => {
        updateInterest(item);
        setDefaultData(item);
    } 


    const flavorOptions = value.map(item => item._id);

    const filteredItems = interest?.filter(item => flavorOptions.includes(item.value));

    useEffect(() => {

        if (value?.length > 0) { 
            setDefaultData(filteredItems ?? []);
            updateInterest(filteredItems ?? [])
        }
        
    }, [value, interest]) 

    return (
        <Select
            value={defaultData}
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            onChange={handler}
            isMulti
            name="interest"
            placeholder={placeholder}
            options={interest}
            className="basic-multi-select !font-medium !text-sm  "
            classNamePrefix="select"
        />
    );
}
