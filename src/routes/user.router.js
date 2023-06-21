import {
    infoSession,
    login,
    logout,
    visit
} 
from "../controllers/user.controllers.js"

import { Router } from "express";
import { validateLogin } from "../middlewares/validateLogin.js";

const router  = Router();

router.post("/login", login);
router.get("/info", validateLogin,infoSession);
router.get("/secret-endpoint", validateLogin, visit);
router.post("/logout", logout);


export default router;
