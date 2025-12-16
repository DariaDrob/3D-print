import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

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
    async create(projectData: { name: string; img: string; desc: string }) {
        const newProject = new this.projectModel(projectData);
        return await newProject.save();
    }
}
