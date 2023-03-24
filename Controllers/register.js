
import moment from 'moment';

export default (req, res, db, bcrypt) => {
    const {email, password, name} = req.body;
    if (!email || !password || !name)
        return res.status(400).json('Invalid data format.')

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
                console.log(user[0]);
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
}