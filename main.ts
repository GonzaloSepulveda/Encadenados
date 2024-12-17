import {MongoClient} from "mongodb"
import { BookModel } from "./types.ts";
import { AuthorModel } from "./types.ts";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  console.log("Fallo url");
  Deno.exit(-1);
}

const client = new MongoClient(MONGO_URL);

await client.connect();

console.log("Cliente conectado correctamente")

const db = client.db("MisCadenas"); 

export const BookCollection = db.collection<BookModel>("book");
export const AuthorCollection = db.collection<AuthorModel>("author");


const server = new ApolloServer({
  typeDefs:schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context:async() =>(await{
    BookCollection,
    AuthorCollection,
  }),
  listen: { port: 8080},
});

console.log(`Server running on ${url}`);

