import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI; // Access from serverless environment variables

export default async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies"); // Assuming 'movies' is a relevant collection in 'sample_mflix'

    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching todos" });
  } finally {
    await client.close();
  }
};
