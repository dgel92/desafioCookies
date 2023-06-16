import { __dirname } from './utils.js';
import cookieParser from "cookie-parser";
import express from "express";
import handlebars from "express-handlebars";
import loginRouter from "./routes/login.router.js";
import session from 'express-session';
import viewsRouter from "./routes/views.router.js"

const app = express();


const sessionConfig = {
    secret: "123456",
    cookie: {maxAge: 20000},
    saveUninitialized: true,
    resave: false
}

app.use(session(sessionConfig));
const users = [
    {
        username: "juan",
        password: 123456,
        admin: true
    },
    {
        username: "jose",
        password: 123456,
        admin: false
    }
];

app.post("/login", (req, res) =>{
    const {username, password}= req.body
    const index = users.findIndex((user)=> user.username === username && user.password === password)
    console.log(index);
    if(index < 0 ){
        res.status(401).json ({message: " no estas autorizado"})
    } else{
        const user = users[index];
        req.session.info = {
            loggedIn : true,
            count: 1,
            admin: user.admin
        }
        res.json({msg: "bienvenido"})
    }
})

 //app.use(cookieParser(secret));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/login", loginRouter)
app.use("/", viewsRouter)

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "/hanblebars")

app.get('/set-cookie', (req, res) => {
    res.cookie('idioma', 'ingles').json({msg: 'ok'})
});

app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);
    const { idioma } = req.cookies;
    idioma === 'ingles' ? res.send('Hello!') : res.send('Hola!')
    // console.log(req.signedCookies);
});

app.get('/set-signed-cookie', (req, res) => {
    res.cookie('name', 'Martin', {signed: true}).json({msg: 'ok'})
});

app.get('/', (req, res) => {
    res.json({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    })
    // res.clearCookie('idioma')
    // res.send('ok')
});

app.listen(8080, ()=>{
console.log('🚀 Server listening on port 8080');
});