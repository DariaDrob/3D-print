// src/projects/schemas/project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    img: string;

    @Prop({ required: true })
    desc: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);