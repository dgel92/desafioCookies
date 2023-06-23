import './db/database.js'

import { __dirname } from './utils.js'
import cookieParser from 'cookie-parser'
import express from 'express'
import handlebars from 'express-handlebars'
import mongoStore from 'connect-mongo'
import session from 'express-session'
import usersRouter from './routes/user.router.js'
import viewsRouter from './routes/views.router.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")

app.use(
    session({
        secret:"sessionKey",
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge: 20000
        },
        store: new mongoStore({
            mongoUrl: 'mongodb+srv://admin:6sV95ut00BcLdSB2@cluster0.vcskbbl.mongodb.net/coderhouse',
            autoRemove: "interval",
            ttl: 20,
            crypto:{
                secret:"1234",
            },
        }),
    })
);

app.use('/users',usersRouter)
app.use('/views',viewsRouter)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})


/*const storeOptions = {
    store: new MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:6sV95ut00BcLdSB2@cluster0.vcskbbl.mongodb.net/coderhouse',
        crypto:{
            secret: '123456'
        },
        autoRemove: "interval",
        ttl: 180
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 180000
    }
}*/

/*const FileStore = sessionFileStore(session)

const fileStoreOptions={
    store: new FileStore({
        path: "./sessions",
        ttl: 1800, 
        //reapInterval: 60
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 18000
    }
} 
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(session(fileStoreOptions));
app.use("/api", mainRouter)

app.use("/api", mainRouter)

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT}`);
    });

    export default app
    */

    //mongodb+srv://admin:<6sV95ut00BcLdSB2>@cluster0.vcskbbl.mongodb.net/