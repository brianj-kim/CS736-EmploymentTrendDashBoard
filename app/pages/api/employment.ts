import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb'

// Define a type for the data you expect to send/receive to/from the API
// type Data = {
//   name?: string;
//   // other fields...
// }[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  try {
    const client = await clientPromise;
    const db = client.db("your_database_name");

    const data: any = await db.collection("employment").find({}).limit(20).toArray();
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
