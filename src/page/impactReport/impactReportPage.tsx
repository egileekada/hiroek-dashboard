import { ReportCardList } from '../../components/report'
import PageHeader from '../../components/shared/pageHeader'

export default function ImpactReportPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header="Impact Report" body="Showcase the difference you’re making by sharing success stories and ensuring transparency with your donors." />
            <ReportCardList />
        </div>
    )
}