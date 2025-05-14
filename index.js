const express = require("express");
const { body, param, validationResult } = require("express-validator");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" },
];

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /items - Retrieve all items
app.get("/items", (req, res) => {
  res.json(items);
});

// GET /items/:id - Retrieve a single item by ID
app.get(
  "/items/:id",
  param("id").isInt().withMessage("ID must be a valid integer"),
  (req, res) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  }
);

// POST /items - Create a new item
app.post(
  "/items",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("description").isString().notEmpty().withMessage("Description is required"),
  ],
  (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    const newItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      name,
      description,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  }
);

// PUT /items/:id - Update an item by ID
app.put(
  "/items/:id",
  [
    param("id").isInt().withMessage("ID must be a valid integer"),
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("description").isString().notEmpty().withMessage("Description is required"),
  ],
  (req, res) => {
    // Validate request parameters and body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const { name, description } = req.body;
    items[itemIndex] = { id, name, description };
    res.json(items[itemIndex]);
  }
);

// DELETE /items/:id - Delete an item by ID
app.delete(
  "/items/:id",
  param("id").isInt().withMessage("ID must be a valid integer"),
  (req, res) => {
    // Validate request parameters
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const deletedItem = items.splice(itemIndex, 1);
    res.json({ message: "Item deleted", item: deletedItem[0] });
  }
);

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});