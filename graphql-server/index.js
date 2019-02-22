const {TodosAPI} = require('./todos');
const {importSchema} = require('graphql-import');
const {ApolloServer, gql} = require('apollo-server');

const typeDefs = importSchema('./schema.graphql');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    todos: async (_source, _args, {dataSources}) =>
      dataSources.todosAPI.getTodos()
  },
  Mutation: {
    updateTodo: async(_source, {todo}, {dataSources}) =>
      dataSources.todosAPI.updateTodo(todo),
    addTodo: async(_source, {text}, {dataSources}) =>
      dataSources.todosAPI.addTodo(text),
    deleteTodo: async(_source, {id}, {dataSources}) =>
      dataSources.todosAPI.deleteTodo(id)

  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({todosAPI: new TodosAPI()}),
  tracing: true
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
