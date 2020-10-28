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
exports.Usuario = void 0;
var typeorm_1 = require("typeorm");
var TipoUsuario_1 = require("./TipoUsuario");
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "IDUsuario", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "Nombres", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "Apellidos", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "Identificaci\u00F3n", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return TipoUsuario_1.TipoUsuario; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", TipoUsuario_1.TipoUsuario)
    ], Usuario.prototype, "idTipoUsuario", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "Mail", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "Celular", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "Usuario", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Usuario.prototype, "Contrase\u00F1a", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "Estado", void 0);
    Usuario = __decorate([
        typeorm_1.Entity()
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
