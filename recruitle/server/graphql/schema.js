// package imports
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require('lodash');
// project imports
const Applicant = require('../database/models/applicant');
const Employer = require('../database/models/employer');

const ApplicantType = new GraphQLObjectType({
  name: 'Applicant',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  })
});

const EmployerType = new GraphQLObjectType({
  name: 'Employer',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    companyName: { type: GraphQLString },
    // jobs: {
    //   type: new GraphQLList(BookType),
    //    resolve(parent, args) {
    //      return Jobs.find({employerId: parent.id });
    //    }
    // }
  })
});

// const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     age: { type: GraphQLInt },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve(parent, args) {
//         return Book.find({authorId: parent.id });
//       }
//     }
//   })
// });

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    applicant: {
      type: ApplicantType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        //return {id: args.id, firstName: "osman", lastName: "aj", emailAddress: "ag"}
        //return Applicant.findById(args.id);
        return Applicant.findOne({"_id": args.id})
      }
    },
    employer: {
      type: EmployerType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Employer.findOne({"_id": args.id})
      }
    },
    // author: {
    //   type: AuthorType,
    //   args: { id: { type: GraphQLID }},
    //   resolve(parent, args) {
    //     return Author.findById(args.id);
    //   }
    // },
    // books: {
    //   type: new GraphQLList(BookType),
    //   resolve(parent, args) {
    //     return Book.find({});
    //   }
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve(parent, args) {
    //     return Author.find({});
    //   }
    // }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addAuthor: {
//       type: AuthorType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: new GraphQLNonNull(GraphQLInt) }
//       },
//       resolve(parent, args) {
//         let author = new Author({
//           name: args.name,
//           age: args.age
//         });
//         return author.save();
//       }
//     },
//     addBook: {
//       type: BookType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         genre: { type: new GraphQLNonNull(GraphQLString) },
//         authorId: { type: new GraphQLNonNull(GraphQLID) }
//       },
//       resolve(parent, args) {
//         let book = new Book({
//           name: args.name,
//           genre: args.genre,
//           authorId: args.authorId
//         });
//         return book.save();
//       }
//     }
//   }
// })

module.exports = new GraphQLSchema({
  query: RootQuery,
  //mutation: Mutation,
});


// module.exports = function(){
//   var schema = `
//   type Query {
//     hello: String
//     boy: Boy
//     user(id: String): User
//   }

//   type Boy {
//     id: String
//     hobby: String
//   }

//   type User {
//     id: String
//     password: String
//   }
// `;

//   return schema;
// }