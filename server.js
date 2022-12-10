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

const passport = require("passport");
const initializePassport = require("./passportConfig.js");
initializePassport(passport);

// all defining variables from nlptoolkit folder
const getSentence = require("./nlptoolkit/corpus");
const getInformationRetrieval = require("./nlptoolkit/informationRetrieval");
const getNGramSpellChecker = require("./nlptoolkit/ngramSpellChecker");

// all definiing variable from assets folder
// var myCss = { style : fs.readFileSync('./assets/style/style.css','utf-8') };
const getDashboard = require("./assets/script/dashboardScript");



const storage = require('node-sessionstorage');

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
    res.render("index");
});

app.get('/users/login', checkAuthenticated, (req, res) => {

    res.render("login")
});

app.get('/users/register', checkAuthenticated, (req, res) => {

    res.render("register")
});

app.get('/users/dashboard/', checkNotAuthenticated, (req, res) => {

    let myQuery = undefined, myPlatform = undefined, myRetrievalType = undefined;
    //console.log(storage.getItem("mySearchBoxQuery"))
    let array = [];
    if(storage.getItem("mySearchBoxQuery") != undefined)
        array = splitLinkAttachment(storage.getItem("mySearchBoxQuery").toString());
    if(array.length > 0)
        myQuery = array[0];
    if(array.length > 1)
        myPlatform = array[1];
    if(array.length > 2)
        myRetrievalType = array[2];
        
    // ngram spell checker analysis metotunu cagirip query degistirildi
    console.log("before : " + myQuery);
    let array2 = [];
    let value = "";
    if(myQuery !== undefined){
        array2 = getNGramSpellChecker().nGramSpellCheckerAnalysis(myQuery);
        let sentence = getSentence().sentenceAnalysis(array2[1]);
        sentence = getSentence().toCapital(sentence);
        console.log("after : " + sentence.toWords());
        value = sentence.toWords();
    }

    res.render("dashboard", {

        userName : req.user.name,
        value : value,
        platform : myPlatform,
        type : myRetrievalType,
        array2 : array2,
        informationRetrieval : getInformationRetrieval(),
        dashboard : getDashboard()
    })
});

app.get('/users/dashboard2/', checkNotAuthenticated, (req, res) => {

    res.render("dashboard", { 
        
        userName : req.user.name
    });
})

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
        errors.push({message: "Password must be at least 6 characters long"});
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
                    res.render("register", {message: "Email already registered"});
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
    successRedirect: "/users/dashboard/",
    failureRedirect: "/users/login",
    failureFlash: true
}));

app.post("/users/dashboard", (req, res, next) => {

    let {myQuery, myPlatform, myRetrievalType} = req.body;
    let errors = [];
    if(req.body.myQuery === "") errors.push({ message : "Enter Query!" });
    if(req.body.myPlatform === '0') errors.push({ message : "Select Platform!" });
    if(req.body.myRetrievalType === '0') errors.push({ message : "Select RetrievalType!" });

    console.log({ myQuery, myPlatform, myRetrievalType });
    if(errors.length > 0){

        console.log({ errors : errors });
        res.render("dashboard", { 
            
            errors : errors,
            userName : req.user.name
        });

    } else {

        let searchBoxQuery = "query=" + myQuery + ":platform=" + myPlatform + ":type=" + myRetrievalType;
        if(req.body.myQuery !== '') myQuery = req.body.myQuery;
        storage.setItem("mySearchBoxQuery", searchBoxQuery)
        
        res.redirect("/users/dashboard/");
    }
});

app.post("/users/dashboard2", (req, res) => {

    let {myDomain, myTextArea} = req.body;

    let errors = [];
    if(myDomain === '0') errors.push({ message : "Select Domain!" });
    if(myTextArea === "") errors.push({ message : "Write Something!" });
    
    console.log({myDomain, myTextArea});
    if(errors.length > 0){

        console.log({ errors : errors });
        res.render("dashboard", { 
            
            errors : errors,
            userName : req.user.name
        });

    } else {

        let textAreaBlog = "domain=" + myDomain + ":text=" + myTextArea;
        if(req.body.myQuery !== '') myQuery = req.body.myQuery;
        storage.setItem("myTextAreaBlog", textAreaBlog)
        
        console.log("girmiş => " + storage.getItem("myTextAreaBlog"))
        
        //res.redirect("/users/dashboard/");
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard/");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

function splitLinkAttachment(sessionStorageItem){

    let array = [];
    if(sessionStorageItem !== "..."){

        let i = 0;
        while(sessionStorageItem !== ""){
            
            console.log("storage : " + sessionStorageItem);  
            
            if(sessionStorageItem.includes(":"))
                array[i] = sessionStorageItem.substring(sessionStorageItem.indexOf("=")+1,sessionStorageItem.indexOf(":"));
            else{ // last index of array
                array[i] = sessionStorageItem.substring(sessionStorageItem.indexOf("=")+1);
                break;
            }

            sessionStorageItem = sessionStorageItem.slice(sessionStorageItem.indexOf(":")+1);
            i++;
        }
    }
    return array;
}

function getTextArea(){

    //var document = new Document();
    // prevent refresh page when click type="submit" button
    document.ready(function(){
        document.getElementsByClassName("btn btn-primary").click(function(event){
            event.preventDefault();
        });
    });

    let textArea = document.getElementById("myTextArea")
    document.onkeydown = function(e){
        e = e || window.event;
        var key = e.UIEvent.which || e.KeyboardEvent.keyCode;
        if(key === 32){
            console.log(textArea.value);
        }
    }
}

app.listen(PORT, () =>{

    console.log('Server running on port ' + PORT);
});