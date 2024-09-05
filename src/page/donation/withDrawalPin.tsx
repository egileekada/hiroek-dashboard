// import React from 'react'

import { PinInputForm } from "../../components/donate";
import PageHeader from "../../components/shared/pageHeader";

export default function WithDrawalPin() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header="Setup Withdrawal Pin" body="Effortless Event Creation and Community Engagement." />
            <PinInputForm />
        </div>
    )
}
