import { Text } from '@radix-ui/themes'
// import { LuSearch } from 'react-icons/lu'
import useGetEventData from '../../hooks/eventHooks/useGetEventData'
// import CustomInputWithoutForm from '../shared/customInputWithoutForm'
import OrganizationCard from './organizationCard'
import OrganizationCardWithId from './organizationCardById'

export default function GetOrganization({ control, value }: { control: any, value: any }) {

    const { data, search } = useGetEventData().getOrganization()

    const { } = useGetEventData().getOrganizationById("66d715e84b09707bb4953534") 

    return (
        <div className=" flex w-full flex-col gap-1 " >
            <Text className=" text-white font-semibold text-sm " >Recipient Organisation</Text>
            {/* <div className=" flex w-full flex-col gap-1 " >
                <CustomInputWithoutForm value={search} setValue={setSearch} icon={<LuSearch size={"20px"} color='white' className=" ml-3 " />} hasLeftIcon={true} borderRadius="8px" color="white" borderWidth="1px" borderColor="white" type="text" placeholder="Search Recipient Organisation" />
            </div> */}
            {!search && (
                <div className=' w-full flex flex-col gap-4 mt-4 ' >
                    {value?.fundRaiser?.organizations?.map((item: string, index: number) => {
                        return (
                            <div className=' w-full ' key={index} >
                                <OrganizationCardWithId value={value?.fundRaiser?.organizations} index={item} control={control} name='fundRaiser.organizations' />
                            </div>
                        )
                    })}
                </div>
            )}
            {search && (
                <div className=" flex flex-col gap-4 mt-8 " >
                    {data?.map((item, index) => {
                        return (
                            <div className=' w-full ' key={index} >
                                <OrganizationCard value={value} name='fundRaiser.organizations' control={control} item={item} />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
