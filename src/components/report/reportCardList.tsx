import { Text } from "@radix-ui/themes"


export default function ReportCardList() {

    const data = ["item", "item"]

    return (
        <div className=' w-full flex flex-col gap-4 pb-6 ' >
            {data?.map((item) => {
                return (
                    <div key={item} className=" w-full flex gap-6 " >
                        <div className=" w-full max-w-[419px] h-[318px] rounded-[32px] flex flex-col relative bg-purple-500 p-6 " >
                            <div className=" w-full flex mt-auto gap-2 " >
                                <div className=" w-full h-[80px] rounded-2xl bg-violet-500 " />
                                <div className=" w-full h-[80px] rounded-2xl bg-violet-500 " />
                                <div className=" w-full h-[80px] rounded-2xl bg-violet-500 " />
                            </div>
                        </div>
                        <div className=" w-full flex flex-col justify-center gap-3 " >
                            <Text className=" tracking-[3px] text-[#6D6E76] " >AUGUST 2024</Text>
                            <Text className=" text-[#232536] tracking-[-2px] !leading-[40px] text-[36px] font-bold " >Empowering Local Communities and Businesses</Text>
                            <Text className=" text-[#6D6E76] " >We have been at the forefront of empowering local communities through various outreach programs. This year, we successfully organized over 50 community workshops focusing on skill development, health education, and financial literacy. These initiatives have reached more than 10,000 individuals, providing them with the tools and knowledge to improve their quality of life.</Text>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}