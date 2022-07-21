import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { EnrollmentService } from "../../../services/enrollment.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { Enrollment } from "../models/enrollment";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsResolver {
    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentService
    ){}

    // @Query(() => Student)
    // @UseGuards(AuthorizationGuard)
    // me(
    //     @CurrentUser() user: AuthUser
    // ) {
    //     return this.studentsService.getStudentByAuthUserId(user.sub)
    // }

    @Query(() => [Student])
    @UseGuards(AuthorizationGuard)
    students() {
        return this.studentsService.listAllStudents()
    }

    @ResolveField(() => Enrollment)
    enrollments(
        @Parent() student: Student,
    ) {
        return this.enrollmentsService.listEnrollmentsByStudent(student.id)
    }
}