import cookieParser from 'cookie-parser';
import express from "express";
import mainRouter from "./routes/user.router.js"
import session from 'express-session';
import sessionFileStore from "session-file-store"

const FileStore = sessionFileStore(session)

const fileStoreOptions={
    store: new FileStore({
        path: "./sessions",
        ttl: 1800, 
        reapInterval: 60
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
