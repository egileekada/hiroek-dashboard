import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"

const BASE_URL = import.meta.env.VITE_APP_BASE_URL
const httpService = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
})

export const unsecureHttpService = axios.create({
    baseURL: `${BASE_URL}`,
})

unsecureHttpService.interceptors.response.use((data) => {
    return data;
}, async (error: AxiosError<any, unknown>) => {
    return Promise.reject(error);
});

httpService.interceptors.request.use(
  function (config: any) {
    const token = Cookies.get("access_token") 
    
    if (token) {
      config.headers["Authorization"] = "Bearer " +token
    }
    return config
  },
  function (error: any) {
    // if (error.response.status === 500) {
    //   error.response.data.message = "Something wrong has happened. Try again later."
    // }
    return Promise.reject(error)
  },
)

export default httpService



// <Table v-if="!loading" > 
// <TableHeader class=" rounded-md " >
//     <TableRow class=" text-sm font-medium text-mutetextcolor h-10 " >
//     <TableHead ><input type="checkbox" /></TableHead>
//         <TableHead >Name</TableHead>
//         <TableHead>Email</TableHead>
//         <TableHead>NIN</TableHead>
//         <TableHead>BVN</TableHead>
//         <TableHead>Country</TableHead>
//         <TableHead>Level</TableHead>
//         <TableHead>Created At</TableHead>
//         <TableHead></TableHead>
//     </TableRow>
// </TableHeader>
// <TableBody>
//     <TableRow class=" h-[55px] text-sm text-primarycolor " v-for="item in users" :key="item.node.id" >
//         <TableCell ><input type="checkbox" /></TableCell>
//         <TableCell >{{item?.node?.username ?? "none"}}</TableCell> 
//         <TableCell >{{item?.node?.email ?? "none"}}</TableCell> 
//         <TableCell >{{item?.node?.nin ?? "none"}}</TableCell>  
//         <TableCell >{{item?.node?.bvn ?? "none"}}</TableCell> 
//         <TableCell >{{item?.node?.country ?? "none"}}</TableCell> 
//         <TableCell >{{item?.node?.level ?? "none"}}</TableCell> 
//         <TableCell >{{item?.node?.createdAt ?? "none"}}</TableCell> 
//         <TableCell >
//             <DrawerLayout> 
//                 <UserModal />
//             </DrawerLayout>    
//         </TableCell>  
//     </TableRow> 
// </TableBody>
// </Table>

// import TransactionCard from "@/reuseable/transactionCard" 
// import { defineComponent } from "vue"

// export default defineComponent({
//     name: "AccountModal",
//     render() {
//         return (
//             <div class={" w-full flex flex-col gap-8 py-8 px-6 "} >
//                 <div class={" w-full flex flex-col gap-1 "} >
//                     <div class={" w-16 h-16 bg-pink-300 rounded-2xl "} >

//                     </div>
//                     <p class={" text-sm font-semibold text-primarycolor "} >Ajimati Mutiu</p>
//                     <p class={" text-xs text-mutetextcolor "} >aj@monosend.app</p>
//                 </div>
//                 <div class={" w-full flex flex-col gap-8 "} >
//                     <div class={" w-full grid grid-cols-2 gap-4 "} >
//                         <div class={" "} >
//                             <p class={" text-xs text-mutetextcolor "} >User ID</p>
//                             <p class={" text-sm font-semibold text-primarycolor "} >28837913</p>
//                         </div>
//                         <div class={" "} >
//                             <p class={" text-xs text-mutetextcolor "} >Phone No</p>
//                             <p class={" text-sm font-semibold text-primarycolor "} >08134376412</p>
//                         </div>
//                         <div class={" "} >
//                             <p class={" text-xs text-mutetextcolor "} >Date Joined</p>
//                             <p class={" text-sm font-semibold text-primarycolor "} >Jan 05, 2025</p>
//                         </div>
//                         <div class={" "} >
//                             <p class={" text-xs text-mutetextcolor "} >Last Active</p>
//                             <p class={" text-sm font-semibold text-primarycolor "} >2h ago</p>
//                         </div>
//                     </div>
//                     <div class={" w-full flex flex-col gap-2 "} >
//                         <p class={" text-primarycolor font-semibold text-base "} >Account Information</p>
//                         <div class={" w-full grid grid-cols-2 gap-4 "} >
//                             <div class={" "} >
//                                 <p class={" text-xs text-mutetextcolor "} >Account No</p>
//                                 <p class={" text-sm font-semibold text-primarycolor "} >812390083</p>
//                             </div>
//                             <div class={" "} >
//                                 <p class={" text-xs text-mutetextcolor "} >Account Status</p>
//                                 <p class={" text-sm font-semibold text-primarycolor "} >Active</p>
//                             </div>
//                             <div class={" "} >
//                                 <p class={" text-xs text-mutetextcolor "} >Current Balance</p>
//                                 <p class={" text-sm font-semibold text-primarycolor "} >₦2,082,083.90</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class={" w-full flex flex-col gap-4 "} >
//                     <p class={" text-primarycolor font-semibold text-base "} >Transactions</p>
//                     <TransactionCard type={true} />
//                     <TransactionCard noborder={true} type={false} />
//                     <button class={" w-full rounded-[6px] bg-white border border-inputcolor h-10 text-sm text-primarycolor "} >
//                         View All Transactions
//                     </button>
//                 </div>
//             </div>
//         )
//     }
// })

// <script setup lang="ts"> 
// import {
//   Sheet, 
//   SheetContent, 
//   SheetTrigger,
// } from '@/components/ui/sheet'
// import { MoreHorizontal } from "lucide-vue-next"
// </script>

// <template>
//   <Sheet >
//     <SheetTrigger as-child>
//       <div class=" cursor-pointer " >
//         <MoreHorizontal />
//       </div>
//     </SheetTrigger>
//     <SheetContent class=" w-full max-w-[420px]" >
//       <div class="relative h-full w-full overflow-y-auto shadow-lg">
//         <slot />
//       </div>
//     </SheetContent>
//   </Sheet>
// </template>