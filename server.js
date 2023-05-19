import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import register from './Controllers/register.js';
import signin from './Controllers/signin.js';
import profile from './Controllers/profile.js';
import entries from './Controllers/entries.js';
import facedetection from './Controllers/facedetection.js';
// import {
//     SecretsManagerClient,
//     GetSecretValueCommand,
//   } from "@aws-sdk/client-secrets-manager";
const PORT = process.env.PORT || 8000;
console.log('entered server');
// const secret_name = "rds!db-2a4478e8-b071-4a76-afeb-fd72125595ad";

// const client = new SecretsManagerClient({
//     region: "us-east-1",
// });

// let result;

// console.log(result);

// try {
//     result = await client.send(
//         new GetSecretValueCommand({
//         SecretId: secret_name,
//         VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//         })
//     );
// } catch (error) {
// // For a list of exceptions thrown, see
// // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// throw error;
// }
// console.log(JSON.parse(result.SecretString));
// const secret = JSON.parse(result.SecretString);
const db = knex({
    client: 'pg',
    // connection: {
    //     host : 'stowe-code-smart-brain.csorbh4x1eyw.us-east-1.rds.amazonaws.com',
    //     port : 5432,
    //     user : secret['username'],
    //     password : secret['password'],
    //     database : 'smartbrain'
    // }
    connection: {
        host : process.env.POSTGRES_HOST,
        user : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Rock on!!')
})

app.post('/signin', (req, res) => signin(req, res, db, bcrypt));
app.post('/register', (req, res) => register(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile(req, res, db));
app.put('/entries', (req, res) => entries(req, res, db));
app.post('/facedetection', (req, res) => facedetection(req, res));

app.listen(8000, ()=> {
    console.log(`app is running on port 8000`);
})