import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let cachedClient;
let cachedDb;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("mydatabase");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const storiesCollection = db.collection("stories");

    const stories = await storiesCollection.find({}).toArray();

    return new Response(JSON.stringify(stories), { status: 200 });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch stories" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { db } = await connectToDatabase();
    const storiesCollection = db.collection("stories");

    const result = await storiesCollection.insertOne(body);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error inserting story:", error);
    return new Response(JSON.stringify({ error: "Failed to insert story" }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const { db } = await connectToDatabase();
    const storiesCollection = db.collection("stories");

    // Convert the ID string to an ObjectId
    const result = await storiesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Story not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Story deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting story:", error);
    return new Response(JSON.stringify({ error: "Failed to delete story" }), {
      status: 500,
    });
  }
}
