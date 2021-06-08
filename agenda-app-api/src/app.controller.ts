import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthenticatedGuard } from "./auth/authenticated.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller("api")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): Object {
        return this.appService.getHello();
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req): any {
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get("protected")
    getProtected(@Request() req): string {
        return req.user;
    }
}
