import { Router } from 'express';
import { Todo } from '../../db/models';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
