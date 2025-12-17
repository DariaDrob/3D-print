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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("./schemas/project.schema");
let ProjectsService = class ProjectsService {
    projectModel;
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async findAll() {
        return this.projectModel.find().exec();
    }
    async seed() {
        const projects = [
            { name: "Mandalorian", img: "/images/product1.jpg", desc: "Товщина шару друку 0,03 мм" },
            { name: "машина DeLorean", img: "/images/product2.jpg", desc: "Може виконуватись у різних масштабах" },
            { name: "Top Gun: Maverich", img: "/images/product3.jpg", desc: "Товщина шару 0,03 мм" },
            { name: "Baby Yoda", img: "/images/product4.jpg", desc: "Фігурка до обробки та видалення підтримок" },
            { name: "Pegasus", img: "/images/product5.jpg", desc: "До розмальовування" },
            { name: "Harry Potter", img: "/images/product6.jpg", desc: "Підставка + фігура" },
            { name: "Harry Potter Owl", img: "/images/product7.jpg", desc: "Товщина шару 0,02 мм" },
            { name: "Doctor Liwsi", img: "/images/product8.jpg", desc: "Товщина шару 0,02 мм" },
            { name: "Афродіта", img: "/images/product9.jpg", desc: "Висота 25,5 см; без попереднього оброблення" },
        ];
        await this.projectModel.deleteMany({});
        await this.projectModel.insertMany(projects);
        return { message: 'База заполнена! 9 проектов добавлено.' };
    }
    async create(projectData) {
        const newProject = new this.projectModel(projectData);
        return await newProject.save();
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map