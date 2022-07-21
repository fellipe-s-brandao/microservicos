import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/courses.service';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentsService } from '../services/students.service';
import { PurchaseController } from './controllers/purchases.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [PurchaseController],
    providers: [
        StudentsService,
        CoursesService,
        EnrollmentService
    ]
})
export class MessagingModule {}
