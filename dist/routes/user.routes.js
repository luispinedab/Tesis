"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
//import {getUsers,createUser,getUser, updateUser, deleteUser} from '../controllers/user.controller';
var user_controller_1 = require("../controllers/user.controller");
router.get('/users', user_controller_1.getUsers);
/*router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);*/
exports.default = router;
