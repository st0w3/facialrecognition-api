import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './Controllers/register.js';
import signin from './Controllers/signin.js';
import profile from './Controllers/profile.js';
import entries from './Controllers/entries.js';
import facedetection from './Controllers/facedetection.js';

const PORT = 8080;

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'test',
        database : 'smart-brain'
    }
    });

db.select('*')
.from('users')
.then(data => {
    console.log(data);
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', (req, res) => signin(req, res, db, bcrypt));
app.post('/register', (req, res) => register(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile(req, res, db));
app.put('/entries', (req, res) => entries(req, res, db));
app.post('/facedetection', (req, res) => facedetection(req, res));

function getUserById (id)
{
    return database.users.filter(x=>x.id === id);
}

app.listen(PORT, ()=> {
    console.log(`app is running on port ${PORT}`);
})