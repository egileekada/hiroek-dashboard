// import React from 'react'

import { PinInputForm } from "../../components/donate";
import PageHeader from "../../components/shared/pageHeader"; 

export default function WithDrawalPin() {

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Update Security Pin" body="DO NOT SHARE YOUR PIN WITH ANYONE" />
            <PinInputForm />
        </div>
    )
}
