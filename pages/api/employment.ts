import clientPromise from "@/app/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export type Employment = {
    _id?: string;
    REF_DATE: String;
    GEO: string;
    DGUID?: string;
    "National Occupational Classification (NOC)": string;
    UOM?: string;
    UOM_ID?: number;
    SCALAR_FACTOR?: string;
    SCALAR_ID?: number;
    VECTOR?: string;
    COORDINATE?: string;
    VALUE?: number;
    STATUS?: string;
    SYMBOL?: any;
    TERMINATED?: any;
    DECIMALS?: number;
    Year: number;
}

export type QueryParams = {
    province: string;
    occupations: string[];
}

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri, {});

async function runQuery({ occupations, province }: QueryParams): Promise<Employment[]> {
    try {        
        const client = await clientPromise;
        const database = client.db("test");
        const employment = database.collection<Employment>('employment')

        const query = {
            GEO: { $regex: new RegExp(province, 'i') },
            "National Occupational Classification (NOC)": { $in: occupations },
            REF_DATE: {
                $gte: "2023-04-01",
                $lte: "2024-03-01"
            }
        };

        // console.log("Query being run:", query);
        const results = await employment.find(query).toArray();

        // console.log(results);
        return results;
    } finally {
        await client.close();
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Employment[] | { message: string }>) {
    const { province } = req.query;
    let occupations = req.query['occupations[]'] || req.query['occupations'];

    if (req.method === 'GET') {
        if (!province || !occupations) {
            return res.status(400).json({ message: "Province or occupations is required" });
        }

        try {
            const data = await runQuery({ 
                occupations: occupations as string[],
                province: province as string
            });
            res.status(200).json(data);
        } catch (error: any) {
            console.error("Query error:", error);
            res.status(500).json({ message: "Failed to fetch data" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}