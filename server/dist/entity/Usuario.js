"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var TipoUsuario_1 = require("./TipoUsuario");
var Curso_1 = require("./Curso");
var Asignatura_1 = require("./Asignatura");
var Notas_1 = require("./Notas");
var Fallas_1 = require("./Fallas");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "IDUser", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "Name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "Lastname", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], User.prototype, "Identification", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return TipoUsuario_1.UserType; }, function (IDUserType) { return IDUserType.users; }),
        __metadata("design:type", TipoUsuario_1.UserType)
    ], User.prototype, "IDUserType", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "Email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "PhoneNumber", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "Nickname", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "Password", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], User.prototype, "UserState", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Curso_1.Grade; }, function (grade) { return grade.IDDirector; }),
        __metadata("design:type", Array)
    ], User.prototype, "grades", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Asignatura_1.Subject; }, function (subject) { return subject.IDTeacher; }),
        __metadata("design:type", Array)
    ], User.prototype, "subjects", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Notas_1.ratings; }, function (rating) { return rating.IDDocente; }),
        __metadata("design:type", Array)
    ], User.prototype, "notas", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Fallas_1.absences; }, function (absence) { return absence.IDDocente; }),
        __metadata("design:type", Array)
    ], User.prototype, "fallas", void 0);
    User = __decorate([
        typeorm_1.Entity("user")
    ], User);
    return User;
}());
exports.User = User;
