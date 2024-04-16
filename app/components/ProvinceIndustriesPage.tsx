'use client'

import { useEffect, useState } from "react";
import { Industry, Province } from "./Provinces";
import axios from "axios";

type ProvinceIndustriesPageProps = {
    provinceId: string;
}

export default function ProvinceIndustriesPage ({ provinceId }: ProvinceIndustriesPageProps) {

    

    return (
        <div>
            Component for Provincial Industries Monthly
        </div>
    )
}