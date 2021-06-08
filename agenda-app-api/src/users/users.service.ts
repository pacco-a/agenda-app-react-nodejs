import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./users.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: { username: username },
        });

        return user;
    }

    async createUser(password: string, username: string): Promise<User> {
        const newUser = this.userRepository.create({
            username: username,
            password: password,
        });

        return this.userRepository.save(newUser);
    }
}
