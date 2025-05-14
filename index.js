import express from 'express';
import usersRoutes from './routes/users.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    if (!'/') {
        res.status(500).send('Server error!');
    }
    res.send('Hello World!');
})

app.use('/items', usersRoutes)

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server listening on http://localhost:${PORT}`);
})
