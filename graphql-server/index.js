const {TodosAPI} = require('./todos');
const {importSchema} = require('graphql-import');
const {ApolloServer, gql} = require('apollo-server');

const typeDefs = importSchema('./schema.graphql');


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
      dataSources.todosAPI.deleteTodo(id),
    clearCompleted: async(_source, {id}, {dataSources}) => {
      const todos = await dataSources.todosAPI.getTodos();
      return Promise.all(todos
        .filter(t => t.isCompleted)
        .map(t => dataSources.todosAPI.deleteTodo(t.id))
      );
    },
    toggleAll: async(_source, {id}, {dataSources}) => {
      const todos = await dataSources.todosAPI.getTodos();
      const toggleValue = !todos.every(t => t.isCompleted);
      return Promise.all(todos
        .filter(t => t.isCompleted !== toggleValue)
        .map(t =>
          dataSources.todosAPI.updateTodo({...t, isCompleted: toggleValue})
            .then(t => t.id)
        )
      );
    }
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
