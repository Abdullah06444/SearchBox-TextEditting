const express = require('express');
const app = express();
const { pool } = require('./dbConfig.js');
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

var fs = require('fs');
var path = require('path');
app.set('views',path.join(__dirname + '/views'));
//app.use('assets',express.static(path.join(__dirname, '/assets'))); 
//app.use(express.static(__dirname + '/assets'))

// all definiing variable from assets folder
var myCss = { style : fs.readFileSync('./assets/style/style.css','utf-8') };
const getDashboard = require("./assets/script/dashboardScript");

const passport = require("passport");
const initializePassport = require("./passportConfig.js");
initializePassport(passport);

// all defining variables from nlptoolkit folder
const getSentence = require("./nlptoolkit/corpus");
const getInformationRetrieval = require("./nlptoolkit/informationRetrieval");
const getNGramSpellChecker = require("./nlptoolkit/ngramSpellChecker");

const PORT = process.env.PORT || 4000;

//console.log(__dirname)
//console.log(process.cwd())
//console.log(__filename)
//console.log(require('path').basename(__dirname))



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

//app.use("/src", express.static('src'));

app.get('/', (req, res) => {

    //res.status(200).send('<h1>Welcome</h1>');
    res.render("index", {
        myCss : myCss
    });
});

app.get('/users/login', checkAuthenticated, (req, res) => {

    res.render("login", {
        myCss : myCss
    })
});

app.get('/users/register', checkAuthenticated, (req, res) => {

    res.render("register", {
        myCss : myCss
    })
});

app.get('/users/dashboard/:linkAttachment', checkNotAuthenticated, (req, res) => {

    let myQuery = "...", myPlatform = "...", myRetrievalType = "...";
    let array = splitLinkAttachment(req.params.linkAttachment.toString());
    if(array.length > 0)
        myQuery = array[0];
    if(array.length > 1)
        myPlatform = array[1];
    if(array.length > 2)
        myRetrievalType = array[2];
        
    // ngram spell checker analysis metotunu cagirip query degistirildi
    console.log("before : " + myQuery);
    let array2 = getNGramSpellChecker().nGramSpellCheckerAnalysis(myQuery);
    let sentence = getSentence().sentenceAnalysis(array2[1]);
    sentence = getSentence().toCapital(sentence);
    console.log("after : " + sentence.toWords());

    res.render("dashboard", {

        userName : req.user.name,
        myCss : myCss,
        value : sentence.toWords(),
        platform : myPlatform,
        type : myRetrievalType,
        array2 : array2,
        informationRetrieval : getInformationRetrieval(),
        dashboard : getDashboard()
    })
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
                    console.log("throw err 1");
                }
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
    successRedirect: "/users/dashboard/...",
    failureRedirect: "/users/login",
    failureFlash: true
}));

app.post("/users/dashboard", (req, res, next) => {

    let {myQuery, myPlatform, myRetrievalType} = req.body;
    let warn = [];
    if(req.body.myQuery !== '') myQuery = req.body.myQuery; else myQuery = "...";
    if(req.body.myPlatform !== '') myPlatform = req.body.myPlatform; else warn.push({ message : "Select Platform" });
    if(req.body.myRetrievalType !== '') myRetrievalType = req.body.myRetrievalType; else warn.push({ message : "Select RetrievalType" });

    console.log({ myQuery, myPlatform, myRetrievalType });
    if(warn.length !== 0){

        console.log({ warn });
        res.render("dashboard", { warn });
    } else {

        //history.pushState("","","/users/dashboard/" + myQuery);
        let linkAttachment = "query=" + myQuery + ":platform=" + myPlatform + ":type=" + myRetrievalType;
        if(req.body.myQuery !== '') myQuery = req.body.myQuery; else linkAttachment = "...";
        res.redirect("/users/dashboard/" + linkAttachment);
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard/...");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

function splitLinkAttachment(linkAttachment){

    let array = [];
    if(linkAttachment !== "..."){

        let i = 0;
        while(linkAttachment !== ""){
            
            //console.log("link : " + linkAttachment);  
            
            if(linkAttachment.includes(":"))
                array[i] = linkAttachment.substring(linkAttachment.indexOf("=")+1,linkAttachment.indexOf(":"));
            else{ // last index of array
                array[i] = linkAttachment.substring(linkAttachment.indexOf("=")+1);
                break;
            }

            linkAttachment = linkAttachment.slice(linkAttachment.indexOf(":")+1);
            i++;
        }
    }
    return array;
}

app.listen(PORT, () =>{

    console.log('Server running on port ' + PORT);
});

/*
    "//@types/dom-parser": "^0.1.1",
    "//xhr2": "^0.2.1",
    "//xmlhttprequest": "^1.8.0"
 */