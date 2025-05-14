
const items = [
    {
    id: "1",
    name: "Sneakers",
    description: "Men outfits!"
},
{
    id: "2",
    name: "Colar shirt",
    description: "Men outfits!"
}
]

export const getItems = (req, res) => {
        res.send(items);
    
}

export const foundItem = (req, res) =>  {
    if (!req.params) {
        res.status(400).send('Bad request');
        return;
    }
    const {id} = req.params;
    const foundItem = items.find((item) => item.id === id);
    res.send(foundItem);
    console.log(foundItem)
}


export const createItem = (req, res) => {
    if (!req.body.id || req.body.name || req.body.description) {
        res.status(400).send('Bad request');
        return;
    }
    const item = req.body;
    items.push(item);
    res.send(`Item with ${item.name} uploaded successfully.`)
  
}

export const updateItem = (req, res) => {
    const { idItem } = req.params;
    if (!idItem) {
        res.status(404).send('Page not found');
    }
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
}

export const deleteItem = (req, res) => {
    const { id } = req.params;
    const deleteItem = items.filter((item) => {
        item.id !== id;
        res.send(deleteItem);
    })

}


