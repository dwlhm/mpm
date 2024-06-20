import { ChartPieIcon } from "@heroicons/react/24/outline";
import { PerangkatSubBody, PerangkatSubHeadingPanel, PerangkatSubTitle } from "../components";

export default function PerangkatEnergyOverview() {
    return(
        <>
            <PerangkatSubHeadingPanel withoutBackBtn={true}>
                <PerangkatSubTitle className="flex items-center gap-2">
                    <ChartPieIcon className="w-5 h-5" />Dashboard
                </PerangkatSubTitle>
            </PerangkatSubHeadingPanel>
            <PerangkatSubBody>
                Perangkat Energy Overview
            </PerangkatSubBody>
        </>
    )
}