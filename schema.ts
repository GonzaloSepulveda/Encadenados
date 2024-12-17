export const schema =`#graphql

    type Book{
        id:ID!,
        titulo:String!,
        autores:[Author!]!,
        numAutores:Int!
    },

    type Author{
        id:ID!,
        nombre:String!,
        email:String!,
        books:[Book!]!,
        numBooks:Int,
    },


    type Query{
        books:[Book!]!
        book(id:ID!):Book
    }

    type Mutation{
        addBook(titulo:String!,autores:[ID!]!):Book!
    }






`
 