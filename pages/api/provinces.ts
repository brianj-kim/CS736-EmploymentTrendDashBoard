import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../app/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db('test');
        const industries = await db.collection('provinces').find({}).toArray();
        
        res.status(200).json(industries);
    } catch (error) {
        console.error('Failed to fetch top industries:', error);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
}
