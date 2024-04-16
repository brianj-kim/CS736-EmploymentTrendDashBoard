'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndustriesComponent from './Industries';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useRouter } from 'next/navigation';
import { findProvinceById } from '../lib/helperFunctions';

export type Province = {
    _id: string;
    name: string;
    abbreviation: string;
    coordinates: [number, number];
    order: number;
}

export type Industry = {
    Year: number;
    GEO: string;
    ["National Occupational Classification (NOC)"]: string;
    VALUE: number;
    YoY_Change: number;
    Rank: number;
}

export default function ProvincesComponent () {
    

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [topIndustries, setTopIndustries] = useState<Industry[]>([]);

    const router = useRouter();

    useEffect(() => {
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


        // axios.get('/api/provinces')
        //     .then(response => setProvinces(response.data))
        //     .catch(error => console.error('Failed to fetch industries', error));

        //     axios.get('/api/industries')
        //     .then(response => setIndustries(response.data))
        //     .catch(error => console.error('Failed to fetch industries', error));
        
    }, []);
    

    const handleClick = (provinceId: string) => {
        // console.log(provinceId);
        router.push(`/provinces/${provinceId}`)
    }


    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {provinces.sort((a, b) => a.order - b.order).map((province, index) => (
                <div key={index} className="border border-indigo-600 rounded-md cursor-pointer" onClick={() => handleClick(province._id)}> 
                    <div className="w-full bg-indigo-600 text-white font-semibold p-3 border-b-1 border-gray-200 rounded-t-md text-gray-600"><span className="text-xl">{province.abbreviation}</span> - {province.name} </div>                    
                    <div className="px-4 pb-2">
                        <IndustriesComponent industries={industries} province={province} setTopIndustries={setTopIndustries}/>
                    </div>
                </div>
            ))}
            </div>
        </div>
        // <div>
        // <MapContainer center={[56, -106]} zoom={4} style={{ height: '500px', width: '100%' }}>
        //     <TileLayer
        //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //     />
        //     {provinces.sort((a, b) => a.order - b.order).map((province, index) => (
        //         <Marker key={index} position={province.coordinates}>
        //             <Popup>
        //                 {province.name} <br />
        //                 <IndustriesComponent industries={industries} province={province} />
        //             </Popup>
        //         </Marker>
        //     ))}
        // </MapContainer>
        // </div>
    );
};
