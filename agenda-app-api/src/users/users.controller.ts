import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    Response,
} from "@nestjs/common";
import { Request as RequestObj, Response as ResponseObj } from "express";
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

    @Get("islogin")
    public isLogin(@Request() req): boolean {
        return req.user ? true : false;
    }

    @Get("logout")
    public logOut(@Response() res: ResponseObj) {
        res.cookie("connect.sid", "none");
        res.json({
            success: "Ok",
        });
    }
}
