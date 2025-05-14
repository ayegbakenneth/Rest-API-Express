import express from 'express';

const router = express.Router();

const items = []

router.get('/', (req, res) => {
    res.send(items);
});

router.get('/:id', (req, res) => {
    const id = req.params;
    const foundItem = items.find((item) => item.id === id);
    res.send(foundItem);
})

router.post('/', (req, res) =>{
    const item = req.body;
    items.push(item);
    res.send(`Item with ${item.name} uploaded successfully.`)
});

router.put('/:id', (req, res) => {
    const { idItem } = req.params;
    const { id, name, description } = req.body;
    const item = items.find((item) = item.id === idItem);
    if (id) {
        item.id = id;
    }
    if (name) {
        item.name = name;
    }
    if (description) {
        item.description = description;
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleteItem = items.filter((item) => {
        item.id !== id;
        res.send(deleteItem);
    })
})

export default router;

