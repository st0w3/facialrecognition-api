export default (req, res, db, bcrypt) => {
    console.log('entered signin');
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
}

