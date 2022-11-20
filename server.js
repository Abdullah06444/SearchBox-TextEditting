const express = require('express');
const app = express();
const { pool } = require('./dbConfig.js');
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig.js");

initializePassport(passport);

const PORT = process.env.PORT || 4000;

app.set('view engine', "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(session({

    secret: 'secret',
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/', (req, res) => {

    res.render("index");
});

app.get('/users/login', checkAuthenticated, (req, res) => {

   res.render("login")
});

app.get('/users/register', checkAuthenticated, (req, res) => {

    res.render("register")
});

app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {

    res.render("dashboard", { user : req.user.name })
});

app.get('/users/logout', checkNotAuthenticated, (req, res, next) => {

    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success_msg", "You have logged out");
        res.redirect('/users/login');
    });
});

app.post('/users/register', async (req, res) => {
    let {name, email, password, password2} = req.body;

    console.log({
        name,
        email,
        password,
        password2
    });

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({message: "Please enter all fields"});
    }

    if (password.length < 6) {
        errors.push({message: "Password must be a least 6 characters long"});
    }

    if (password !== password2) {
        errors.push({message: "Passwords do not match"});
    }

    if (errors.length > 0) {
        res.render("register", { errors });
    } else {
        //Form validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // Validation passed
        //pool.connect();
        pool.query(
            "select * from users where \"email\" = '" + req.body.email + "'", (err, results) => {
                if (err) {
                    console.log("throw err");
                }
                console.log("reaches here");
                console.log(results.rows);

                if (results.rows.length > 0) {
                    console.log("Email already registered");
                    return res.render("register", {
                        message: "Email already registered"
                    });
                } else {
                    pool.query(
                        "insert into users (\"name\",\"email\",\"password\") values ('"+ req.body.name +"','"+ req.body.email +"','"+ hashedPassword +"') returning \"id\", \"password\"", (err, results) => {
                            if (err) {
                                console.log("throw err 2");
                            }
                            console.log(results.rows);
                            req.flash("success_msg", "You are now registered. Please log in");
                            res.redirect("/users/login");
                        }
                    );
                }
            }
        );
    }
});

app.post("/users/login", passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })
);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

app.listen(PORT, () =>{

    console.log('Server running on port ' + PORT);
});