import { MongoClient } from "mongodb";
import env from "dotenv";
env.config({ path: "./config/.env" });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n1esoc8.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true });

try {
  await client.connect();
  console.log("Connected to the database");
} catch (error) {
  console.error(error);
}

export default client;
