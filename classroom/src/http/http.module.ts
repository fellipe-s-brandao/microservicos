import { ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/courses.service';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentsService } from '../services/students.service';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule, 
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
        })
    ],
    providers: [
        // Cousers
        CoursesResolver,
        CoursesService,

        // Enrollment
        EnrollmentsResolver,
        EnrollmentService,

        // Student
        StudentsResolver,
        StudentsService,
    ]
})
export class HttpModule {
}
