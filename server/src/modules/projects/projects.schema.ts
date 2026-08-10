import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: Object, required: true })
  title: { en: string; vi: string };

  @Prop({ type: Object, required: true })
  description: { en: string; vi: string };

  @Prop({ default: '' })
  image: string;

  @Prop({ type: [String], default: [] })
  technologies: string[];

  @Prop({ default: '' })
  link: string;

  @Prop({ default: '' })
  github: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  order: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
