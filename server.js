const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const lodash = require("lodash");

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date() 
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date() 
        }
    ],
    
    login: [
        {
            id: "987",
            hash: "",
            email: "john@gmail.com"
        }
    ]
};

app.get("/", (req, res) => {
    res.send(database.users);
});

app.post("/signin", (req, res) => {

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json("error logging in");
        }
    res.json("signing in"); //use .send for the response, .json is similar but sends json instead with some added extra features

});

app.post("/register", (req, res) => {
    //Create a new user
    //Destructure the request
    const { email, name, password } = req.body;



    const newUser = {id: "125",
                        name: name,
                        email: email,
                        password: password,
                        entries: 0,
                        joined: new Date() };


    database.users.push(newUser);

    //remove pw from what we return as a response    
    const newUserNoPw = lodash.omit(newUser, ["password"]);


    //we have to send a response so the req is closed
    res.json(newUserNoPw);

});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    
    if (!found) {
        res.status(404).json("Not found");
    }
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    
    if (!found) {
        res.status(404).json("Not found");
    }
});


app.listen(3000, () => {
    console.log("app is running on port 3000")
});

