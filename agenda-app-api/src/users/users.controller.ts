import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("/api/users")
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post("register")
    public async registerUser(@Body() registerUserDto: RegisterUserDto) {
        // Check if the user already exists
        const alreadyUser = await this.userService.findOne(
            registerUserDto.username,
        );

        if (alreadyUser) {
            return { error: "user already exists" };
        }

        return this.userService.createUser(
            registerUserDto.username,
            registerUserDto.password,
        );
    }
}
