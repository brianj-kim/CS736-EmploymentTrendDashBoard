import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Set Mongo URI to .env');
}

const uri: string = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(uri, {});
clientPromise = client.connect();

export default clientPromise;