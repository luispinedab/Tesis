"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
//import {getUsers,createUser,getUser, updateUser, deleteUser} from '../controllers/user.controller';
var TipoUsuario_controller_1 = require("../controllers/TipoUsuario.controller");
router.get('/Tipo   Usuarios', TipoUsuario_controller_1.getTipoUsuario);
/*router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);*/
exports.default = router;
