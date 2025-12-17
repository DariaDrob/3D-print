import { ProjectsService } from './projects.service';
import type { Multer } from 'multer';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/project.schema").Project, {}, {}> & import("./schemas/project.schema").Project & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    seed(): Promise<{
        message: string;
    }>;
    uploadProject(file: Multer.File, name: string, desc: string, password: string): Promise<{
        message: string;
    }>;
}
