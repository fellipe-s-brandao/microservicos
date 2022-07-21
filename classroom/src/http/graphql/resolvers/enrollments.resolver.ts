import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CoursesService } from "../../../services/courses.service";
import { EnrollmentService } from "../../../services/enrollment.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Course } from "../models/course";
import { Enrollment } from "../models/enrollment";
import { Student } from "../models/student";

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
    constructor(
        private enrollmentService: EnrollmentService,
        private studentsService: StudentsService,
        private coursesService: CoursesService
    ){}

    @Query(() => [Enrollment])
    @UseGuards(AuthorizationGuard)
    enrollments() {
        return this.enrollmentService.listAllEnrollments()
    }

    
    @ResolveField(() => Student)
    student(
        @Parent() enrollment: Enrollment,
    ) {
        return this.studentsService.getStudentById(enrollment.studentId)
    }

    @ResolveField(() => Course)
    course(
        @Parent() enrollment: Enrollment,
    ) {
        return this.coursesService.getCourseById(enrollment.courseId)
    }
}