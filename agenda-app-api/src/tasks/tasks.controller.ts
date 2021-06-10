import { Body, Patch, Request, UseGuards } from "@nestjs/common";
import { Controller, Get, Post, Query } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateTaskDTO, EditTaskDTO } from "./tasks.dto";
import Task from "./tasks.entity";
import { TasksService } from "./tasks.service";

@Controller("api/tasks")
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @UseGuards(AuthenticatedGuard)
    @Get("week")
    public async getWeek(
        @Query("date") date: string,
        @Request() req,
    ): Promise<Object> {
        if (isNaN(Date.parse(date))) {
            return {
                error: "Wrong date query parameter (correct ex: 2021-05-05)",
            };
        }

        const requestedDate = new Date(Date.parse(date));

        return this.tasksService.getWeekTasksByDate(requestedDate, req.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Post()
    public async postTask(
        @Body() createTaskDTO: CreateTaskDTO,
        @Request() req,
    ): Promise<Task> {
        return this.tasksService.createTask(
            createTaskDTO.color,
            new Date(createTaskDTO.date),
            createTaskDTO.details,
            createTaskDTO.resume,
            req.user.id,
        );
    }

    @Patch()
    public async updateTask(@Body() editTaskDTO: EditTaskDTO): Promise<Task> {
        return this.tasksService.UpdateOneTask(editTaskDTO.id, editTaskDTO);
    }
}
