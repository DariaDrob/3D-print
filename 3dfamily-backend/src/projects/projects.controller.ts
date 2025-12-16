import {
    Controller,
    Get,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Multer } from 'multer';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get('seed')
    seed() {
        return this.projectsService.seed();
    }

    @Post('/admin/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './public/images',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
                    return cb(new BadRequestException('Только изображения!'), false);
                }
                cb(null, true);
            },
        }),
    )
    async uploadProject(
        @UploadedFile() file: Multer.File,
        @Body('name') name: string,
        @Body('desc') desc: string,
        @Body('password') password: string,   // ← новый параметр
    ) {
        // ←←←←← ЗАЩИТА ПАРОЛЕМ
        if (password !== process.env.ADMIN_PASSWORD) {
            throw new BadRequestException('Неправильный пароль! Доступ запрещён');
        }

        if (!file) throw new BadRequestException('Фото обязательно');
        if (!name || !desc) throw new BadRequestException('Назва и описание обязательны');

        const imgPath = `/images/${file.filename}`;
        await this.projectsService.create({ name, img: imgPath, desc });

        return { message: 'Проект успешно добавлен!' };}}
