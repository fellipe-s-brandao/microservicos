import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { EnrollmentService } from "../../../services/enrollment.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { CreateCurseInput } from "../inputs/create-curse-input";
import { Course } from "../models/course";

@Resolver(() => Course)
export class CoursesResolver {
    constructor(
        private coursesService: CoursesService,
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentService
    ){}

    @Query(() => [Course])
    @UseGuards(AuthorizationGuard)
    courses() {
        return this.coursesService.listAllCourses()
    }

    @Query(() => Course)
    @UseGuards(AuthorizationGuard)
    async course(
        @Args('id') id: string,
        @CurrentUser() user: AuthUser
    ) {
        const student = await this.studentsService.getStudentByAuthUserId(user.sub);

        if(!student) {
            throw new Error('Student not found');
        }

        const enrollment = await this.enrollmentsService.getByCourseAndStudentId({ courseId: id, studentId: student.id})

        if(!enrollment) {
            throw new UnauthorizedException()
        }

        return this.coursesService.getCourseById(id)
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(() => Course)
    createCourse(
        @Args('data')data: CreateCurseInput
    ) {
        return this.coursesService.createCourse(data);
    }
}