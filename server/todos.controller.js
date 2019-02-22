import db from './db';

class TodosController {
  getAllTodos(req, res) {
    return res.status(200).send(db);
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send(todo);
      }
    });
    return res.status(404).send({
      success: 'false',
      message: 'todo does not exist',
    });
  }

  createTodo(req, res) {
    console.log('req.body', req.body);
    if (!req.body.text) {
      return res.status(400).send({
        success: 'false',
        message: 'text is required',
      });
    }
    const todo = {
      id: db.length + 1,
      text: req.body.text,
      isCompleted: false
    };
    db.push(todo);
    console.log('return is', todo);
    return res.status(201).send(todo);
  }

  updateTodo(req, res) {
    console.log('update todo', req.body, req.params);
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }

    if (req.body.hasOwnProperty('text') && !req.body.text) {
      return res.status(400).send({
        success: 'false',
        message: 'text is required',
      });
    }

    const newTodo = {
      ...todoFound,
      ...req.body
    };

    console.log('new todo', newTodo, 'index', itemIndex);

    db.splice(itemIndex, 1, newTodo);

    console.log('todos', db);

    return res.status(200).send(newTodo);
  }

  deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }
    db.splice(itemIndex, 1);

    console.log(`deleted item with id ${id} at index ${itemIndex}`);

    return res.status(204).send();
  }
}

const todoController = new TodosController();
export default todoController;
