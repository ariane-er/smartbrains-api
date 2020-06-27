const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image');

// Connect to database

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,        
    }
});

const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Welcome to Smart-Brain API. Please head to front-end.");
});

// Call controllers for endpoints.
app.post("/signin", (req, res) => {signin.handleSignin (req, res, db, bcrypt)});
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
app.put("/image", (req, res) => { image.handleImage(req, res, db)});
app.post("/imageurl", (req, res) => { image.handleAPICall(req, res)})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
});