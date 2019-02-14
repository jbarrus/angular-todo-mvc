import express from 'express';
import TodoController from './todos.controller';

const router = express.Router();

router.get('/todos', TodoController.getAllTodos);
router.get('/todos/:id', TodoController.getTodo);
router.post('/todos', TodoController.createTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;
