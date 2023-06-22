import { Router } from "express";
import UserDao from './../daos/user.dao.js';

const UserDao = new UserDao
const router  = Router();

router.post('/register', async (req, res) => {
    try {
        const newUser = await userDao.createUser(req.body)
        if(newUser) {
            res.redirect('/views')
        } else {
            res.redirect('/views/error-register')
        }
        } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.loginUser(req.body);
        if(user) {
            req.session.email = email;
            req.session.password = password;
            res.redirect('/views/profile');
        } else {
            res.redirect('/views/error-login');
        }
    } catch (error) {
        console.log(error);
    }
})

router.get("/info", validateLogIn,infoSession);
router.get("/secret-endpoint", validateLogIn, visit);
router.post("/logout", logout);


export default router;
