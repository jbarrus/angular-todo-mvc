const { RESTDataSource } = require('apollo-datasource-rest');

class TodosAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000/api/v1/';
  }

  async getTodos() {
    return this.get(`todos`);
  }

  async addTodo(text) {
    return this.post('todos', {text});
  }

  async deleteTodo(id) {
    return this.delete(`todos/${id}`)
      .then(() => id);
  }


  async updateTodo(todo) {
    /*
    for some reason the object that comes in can't be stringified correctly by fetch
    so I create a new one with the properties from it using object rest spread
     */
    return this.put(`todos/${todo.id}`, {...todo});
  }
}

module.exports = {
  TodosAPI
};
