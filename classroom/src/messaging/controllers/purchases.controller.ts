import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "../../services/courses.service";
import { EnrollmentService } from "../../services/enrollment.service";
import { StudentsService } from "../../services/students.service";

export interface Customer {
    authUserId: string;
}

export interface Prodcut {
    id: string;
    title: string;
    slug: string;
}

export interface PurchaseCreatedPayload {
    customer: Customer;
    prodcut: Prodcut;
}

@Controller()
export class PurchaseController {
    constructor(
        private studentsService: StudentsService,
        private coursesService: CoursesService,
        private entollmentsService: EnrollmentService
    ) {}

    @EventPattern('purchases.new-purchase')
    async purchaseCreated(
        @Payload() payload: PurchaseCreatedPayload
    ) {
        let student = await this.studentsService.getStudentByAuthUserId(payload.customer.authUserId);

        if(!student) {
            student = await this.studentsService.createStudent({ authUserId: payload.customer.authUserId })
        }

        let course = await this.coursesService.getCourseBySug( payload.prodcut.slug );

        if(!course) {
            course = await this.coursesService.createCourse({
                title: payload.prodcut.title,
                slug: payload.prodcut.slug
            })
        }

        await this.entollmentsService.createEnrollment({
            courseId: course.id,
            studentId: student.id
        })
    }
}