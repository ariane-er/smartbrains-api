const handleRegister = (req, res, db, bcrypt) => {
    //Create a new user
    //Destructure the request
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        res.status(400).json("Incorrect form submission");
    }

    const hash = bcrypt.hashSync(password, 10);
    
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error => res.status(400).json("Unable to register"));

}

module.exports = {
    handleRegister: handleRegister
};