import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import Task from "./tasks.entity";
import { EditTaskDTO } from "./tasks.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
    ) {}

    public async getWeekTasksByDate(targetDate: Date): Promise<Task[]> {
        if (targetDate.getDay() === 0) {
            targetDate.setDate(targetDate.getDate() - 1);
        }

        const dayNumber = targetDate.getDay();

        const daysBeforeInWeek = dayNumber;
        const daysAfterInWeek = 6 - dayNumber;

        /**
         * On ajoute 1 à first et last pour décaler le premier et dernier jour à
         * lundi et dimanche, et on ajoute 1 a last car dans la requête SQL le dernier jour
         * n'est pas inclu (à cause de l'heure p-e ? pas besoin de fix tant qu'on gère pas
         * l'heure de la tache )
         */
        const firstDayInWeek: Date = new Date(Number(targetDate));
        firstDayInWeek.setDate(firstDayInWeek.getDate() - daysBeforeInWeek + 1);
        const lastDayInWeek: Date = new Date(Number(targetDate));
        lastDayInWeek.setDate(
            lastDayInWeek.getDate() + daysAfterInWeek + 1 + 1,
        );

        const weekTasks = await this.tasksRepository.find({
            where: {
                date: Between(
                    firstDayInWeek.toISOString(),
                    lastDayInWeek.toISOString(),
                ),
            },
        });

        return weekTasks;
    }

    public async createTask(
        color: string,
        date: Date,
        details: string,
        resume: string,
    ): Promise<Task> {
        const newTask = this.tasksRepository.create({
            color,
            date,
            details,
            resume,
        });

        return this.tasksRepository.save(newTask);
    }

    public async getOneTask(id: string): Promise<Task> {
        return this.tasksRepository.findOne(id);
    }

    public async UpdateOneTask(
        id: number,
        editTaskDTO: EditTaskDTO,
    ): Promise<Task> {
        const taskToEdit = await this.tasksRepository.findOneOrFail(id);
        taskToEdit.color = editTaskDTO.color
            ? editTaskDTO.color
            : taskToEdit.color;
        taskToEdit.resume = editTaskDTO.resume
            ? editTaskDTO.resume
            : taskToEdit.resume;
        taskToEdit.details = editTaskDTO.details
            ? editTaskDTO.details
            : taskToEdit.details;
        taskToEdit.date = editTaskDTO.date
            ? new Date(editTaskDTO.date)
            : taskToEdit.date;

        taskToEdit.done = editTaskDTO.done ? true : false;

        console.log(editTaskDTO);

        return this.tasksRepository.save(taskToEdit);
    }
}
