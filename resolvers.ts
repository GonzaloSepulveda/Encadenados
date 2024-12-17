import { Collection,ObjectId } from "mongodb";
import { AuthorModel, BookModel } from "./types.ts";
import { BookCollection } from "./main.ts";




type Context = {
    BookCollection:Collection<BookModel>
    AuthorCollection:Collection<AuthorModel>
}

export const resolvers ={

    Book:{
        id:(parent:BookModel,_:unknown,__:unknown):string => {return parent._id!.toString()},
        autores:async(parent:BookModel,_:unknown,ctx:Context):Promise<AuthorModel[]> =>{
            const misAutores = await ctx.AuthorCollection.find({_id:{$in:parent.autores}}).toArray();
            return misAutores
        },
        numAutores:(parent:BookModel,_:unknown,__:unknown):number=> {return parent.autores.length}
    },

    Author:{
        id:(parent:AuthorModel,_:unknown,__:unknown):string => {return parent._id!.toString()},
        books:async(parent:AuthorModel,_:unknown,ctx:Context):Promise<BookModel[]> =>{
            const misLibros = await ctx.BookCollection.find({autores:parent._id}).toArray();
            return misLibros
        },
        numBooks:async(parent:AuthorModel,_:unknown,ctx:Context):Promise<number> =>{
            const miNum = await ctx.BookCollection.find({autores:parent._id}).toArray();
            return miNum.length
        }
    },




    Query:{
        books:async(_:unknown,__:unknown,ctx:Context):Promise<BookModel[]> => {
            return await ctx.BookCollection.find().toArray()
        },
        book:async(_:unknown,args:{id:string},ctx:Context):Promise<BookModel|null> =>{
            return await ctx.BookCollection.findOne({_id:new ObjectId(args.id)})
        }
    },

    Mutation:{
        addBook:async(_:unknown,args:{titulo:string,autores:string[]},ctx:Context):Promise<BookModel> =>{
            const misAutoresId = args.autores.map((a) => new ObjectId(a));
            const miLibro =await BookCollection.insertOne({titulo:args.titulo,autores:misAutoresId})
            return{
                _id:miLibro.insertedId,
                titulo:args.titulo,
                autores:misAutoresId
            }
        }
    }
}
