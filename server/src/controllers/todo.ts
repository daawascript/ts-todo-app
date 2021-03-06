import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Todo from '../entity/Todo';

const nodeEnv = process.env.NODE_ENV || 'development';

export const getAllTodos = async (req: Request, res: Response) => {
  const todoRepository = getRepository(Todo, nodeEnv);
  try {
    const allTodos = await todoRepository.find();
    res.json(allTodos);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const todoRepository = getRepository(Todo, nodeEnv);
  try {
    const todo = await todoRepository.findOne(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const todoRepository = getRepository(Todo, nodeEnv);
  try {
    const todo = await todoRepository.create(req.body);
    const savedTodo = await todoRepository.save(todo);
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const todoRepository = getRepository(Todo, nodeEnv);

  try {
    const todo = await todoRepository.findOne(req.params.id);
    if (!todo) return;
    todoRepository.merge(todo, req.body);
    const savedTodo = await todoRepository.save(todo);
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoRepository = getRepository(Todo, nodeEnv);
  try {
    await todoRepository.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
