"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var TipoUsuario_controller_1 = require("../controllers/TipoUsuario.controller");
router.get('/TipoUsuarios', TipoUsuario_controller_1.getTipoUsuario);
exports.default = router;
