"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var TipoUsuario_routes_1 = __importDefault(require("./routes/TipoUsuario.routes"));
var grade_routes_1 = __importDefault(require("./routes/grade.routes"));
var levelgrade_routes_1 = __importDefault(require("./routes/levelgrade.routes"));
var namesubject_routes_1 = __importDefault(require("./routes/namesubject.routes"));
var subjectarea_routes_1 = __importDefault(require("./routes/subjectarea.routes"));
var subject_routes_1 = __importDefault(require("./routes/subject.routes"));
var achievement_routes_1 = __importDefault(require("./routes/achievement.routes"));
var typeorm_1 = require("typeorm");
var app = express_1.default();
typeorm_1.createConnection();
//middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
//routes
app.use(user_routes_1.default, TipoUsuario_routes_1.default, grade_routes_1.default, levelgrade_routes_1.default, namesubject_routes_1.default, subjectarea_routes_1.default, subject_routes_1.default, achievement_routes_1.default);
app.listen(3000);
console.log('Server on Port', 3000);
