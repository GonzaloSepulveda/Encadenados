
import { ObjectId, OptionalId } from "mongodb"


export type BookModel = OptionalId<{
    titulo:string,
    autores:ObjectId[],
}>

export type AuthorModel = OptionalId<{
        nombre:string,
        email:string,
}>