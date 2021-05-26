import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from './tasks/tasks.service';
import Task from "./tasks/tasks.entity";

@Module({
    imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Task])],
    controllers: [AppController, TasksController],
    providers: [AppService, TasksService],
})
export class AppModule {}
