'use client';

import { Industry, Province } from '@/app/components/Provinces';
import { chartOptions, findProvinceById, getTopIndustriesByProvince, prepareChartData } from '@/app/lib/helperFunctions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Employment } from '@/pages/api/employment';
import { ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

type OccupationData = {
    [monthYear: string]: number;
}

export type GroupedData = {
    [occupation: string]: OccupationData;
}

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

export default function ProvincePage() {
    const params = useParams<{ provinceId: string }>();
    const router = useRouter();

    const [province, setProvince] = useState<Province | undefined>();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [filteredIndustries, setFilteredIndustries] = useState<Industry[]>([]);
    const [employment, setEmployment] = useState<Employment[]>([]);
    const [groupedData, setGroupedData] = useState<GroupedData>({});
    
    let occupations: string[] = filteredIndustries.map(industry => industry['National Occupational Classification (NOC)']);

    useEffect(() => {
        // Fetch all provinces and industries
        const fetchProvinces = axios.get('/api/provinces');
        const fetchIndustries = axios.get('/api/industries');

        axios.all([fetchProvinces, fetchIndustries])
            .then(axios.spread((provincesResp, industriesResp) => {
                setProvinces(provincesResp.data);
                setIndustries(industriesResp.data);
            }))
            .catch(error => {
                console.error('Failed to fetch data', error);
            });
    }, []);

    useEffect(() => {
        const provinceId = params!.provinceId;
        if (provinces.length > 0 && params!.provinceId) {
            const foundProvince = findProvinceById(provinceId, provinces);
            setProvince(foundProvince);

            if (foundProvince) {
                const topIndustries = getTopIndustriesByProvince(industries, foundProvince);
                setFilteredIndustries(topIndustries);
            }
        }
    }, [provinces, params, industries]);

    useEffect(() => {
        const fetchData = async () => {
            // console.log(occupations);
            try {
                const response = await axios.get('/api/employment', {
                    params: {
                        province: province!.name,
                        occupations: occupations,
                        startDate: '2024-03-31',
                        endDate: '2024-04-01'
                    }
                });
                
                setEmployment(response.data);
                //console.log(response.data); // Handle the response data as needed
            } catch (error) {
                console.error('Failed to fetch employment', error);
            }
        };

        if (occupations.length > 0) {
            fetchData();
        }
    }, [province, industries, occupations]);

    useEffect(() => {
        const newGroupedData = employment.reduce<GroupedData>((acc, item) => {
            const date = new Date(item.REF_DATE as string);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        
            if (!acc[item['National Occupational Classification (NOC)']]) {
                acc[item['National Occupational Classification (NOC)']] = {};
            }
            if (!acc[item['National Occupational Classification (NOC)']][monthYear]) {
                acc[item['National Occupational Classification (NOC)']][monthYear] = 0;
            }
        
            acc[item['National Occupational Classification (NOC)']][monthYear] += item.VALUE || 0;
            return acc;
        }, {});

        setGroupedData(newGroupedData);
        
    }, [employment]);

    // console.log(groupedData);

    if (!province || !occupations || !industries || !employment || !groupedData) {
        return <div className="max-w-full h-screen flex justify-center items-center">Loading...</div>; // Handle loading state
    }    

    //console.log(employment);

    
    let chartData = groupedData && prepareChartData(groupedData);
    

    return (
        <div className="max-w-full">
            <div className="max-w-[90%] mx-auto flex justify-between text-center text-2xl font-semibold mt-4 mb-6">
                <button onClick={() => router.push(`/`)} className="uppercase p-2 px-4 bg-indigo-600 text-white rounded-md">
                    List
                </button>
                {province.name}
            </div>
            {/* <div className="w-fit mx-auto divide-solid">
                {occupations.map((occupation, index) => (
                    <div key={index} className="w-full py-2 px-4 border border-b-1 border-gray-100 text-sm">{occupation}</div>
                ))}
            </div> */}
            <div className="w-full flex justify-center mt-8">
                Monthly trends (April 2023 ~ March 2024)
            </div>

            <Line data={chartData} options={chartOptions} />
        </div>
    );
}
