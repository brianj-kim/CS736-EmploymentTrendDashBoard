import { GroupedData } from "../provinces/[provinceId]/page";
import { chartOptions, prepareChartData } from "../lib/helperFunctions";
import { useRouter } from "next/navigation";
import { Province } from "./Provinces";
import 'chartjs-adapter-date-fns';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


export type ChartComponentProps = {
    data: GroupedData,
    province: Province
}

export type ChartDataPoint = {
    x: Date | string;  // Month-Year string
    y: number;  // Value
}

export type DataSet = {
    label: string;
    data: ChartDataPoint[];
    borderColor: string;
    backgroundColor?: string;
    fill: boolean;
}

export interface CustomChartData extends ChartData<'line', ChartDataPoint[], string> {
    datasets: DataSet[];
}
  
export default function ChartComponent ({ province, data }: ChartComponentProps) {
    const chartData = prepareChartData(data);
    const router = useRouter();
    
    return (
        <div className="max-w-full">
            <div className="max-w-[90%] mx-auto flex justify-between text-center text-2xl font-semibold mt-4 mb-6">
                <button onClick={() => router.push(`/`)} className="uppercase p-2 px-4 bg-gray-600 text-white rounded-md">
                    List
                </button>
                {province && province.name}
            </div>
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}