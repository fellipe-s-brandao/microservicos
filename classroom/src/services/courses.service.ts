import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

import slugfy from 'slugify';

interface CreateCourseParams {
    title: string;
    slug?: string;
}

@Injectable()
export class CoursesService {
    constructor(
        private prisma: PrismaService
    ) {}

    listAllCourses() {
        return this.prisma.course.findMany();
    }

    getCourseById(id: string) {
        return this.prisma.course.findUnique({
            where: {
                id
            }
        })
    }

    getCourseBySug(slug: string) {
        return this.prisma.course.findUnique({
            where: {
                slug
            }
        })
    }

    async createCourse({ title, slug }: CreateCourseParams) {
        const courseSlug = slug ?? slugfy(title, { lower: true });

        const courseWithSameSlug = await this.prisma.course.findUnique({
            where: {
                slug: courseSlug
            }
        })

        if(courseWithSameSlug) {
            throw new Error('Another course with same slug already exists.');
        }

        return this.prisma.course.create({
            data: {
                title,
                slug: courseSlug
            }
        })
    }
}