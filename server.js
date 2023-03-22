import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import moment from 'moment';

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

app.post('/signin', (req, res) => {
    const {email, password} = req.body;
    db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid){
            db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => {
                console.log(user);
                res.json(user);
            })
        }
        else
            res.status(400).json('Failed to signin. Check username and password.');
    })
    .catch(err => {
        res.status(400).json('Error ocurred while signing in.');
    });
})

app.post('/register', (req, res) => {
    const {email, password, name} = req.body;
    var created = moment().format('YYYY-MM-DD hh:mm:ss')
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .then(response => {
            trx('users')
            .insert({
                name: name,
                email: email,
                joined: created
            })
            .returning('*')
            .then(user => {
                if (user[0]){
                    res.json(user[0]);
                }
                else {
                    res.status(400).json('Failed registering user.')
                }
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Error ocurred while registering user.'));
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    db.select('*')
    .from('users')
    .where({id: id})
    .then(user => {
        if (user.length){
            res.json(user[0]);
        }
        else {
            res.status(400).json('User not found.')
        }
    })
    .catch(err => res.status(400).json('Error getting user.'));
})


app.put('/entries', (req, res) => {
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => {
        res.status(400).json('Failed to update user entries');
    })
})

function getUserById (id)
{
    return database.users.filter(x=>x.id === id);
}



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})