import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
export declare class ProjectsService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Project, {}, {}> & Project & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    seed(): Promise<{
        message: string;
    }>;
    create(projectData: {
        name: string;
        img: string;
        desc: string;
    }): Promise<import("mongoose").Document<unknown, {}, Project, {}, {}> & Project & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
