import { MongoClient } from "mongodb";

const uri: any = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Please add your Mongo URI correctly');

}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;