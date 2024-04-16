'use client'

import { getTopIndustriesByProvince } from '../lib/helperFunctions';
import { Industry, Province } from './Provinces';

type IndustriesComponentProps = {
    industries: Industry[];
    province: Province;
    setTopIndustries: React.Dispatch<React.SetStateAction<Industry[]>>
}
const IndustriesComponent = ({
    industries, 
    province,
    setTopIndustries
    
    }: IndustriesComponentProps) => {
    const filteredIndustries: Industry[] = getTopIndustriesByProvince(industries, province);
    
    return (
        <div>
            {(filteredIndustries.length > 0) ?                 
                filteredIndustries.map((industry, index) => (
                    <div key={index} className="my-3">
                        <p className="text-sm">{index+1}. {industry["National Occupational Classification (NOC)"]}</p>
                        {/* <p>Employment Change: {industry.YoY_Change}</p> */}
                        {/* <p>Rank: {industry.Rank}</p> */}
                        
                    </div>
                    )
                )
                : <div className="pt-2 text-sm">No Data</div>
            }
        </div>
    );
};

export default IndustriesComponent;
