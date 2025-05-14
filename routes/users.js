import express from 'express';
import { getItems, foundItem, createItem, updateItem, deleteItem } from '../controllers/users.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', foundItem);

router.post('/', createItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

export default router;

