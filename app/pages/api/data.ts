import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    
    // Modify the collection and find query to match your data structure and requirements
    const data = await db.collection('employment-data-time-series').find({}).limit(20).toArray();

    res.status(200).json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch data" });
  }
}
