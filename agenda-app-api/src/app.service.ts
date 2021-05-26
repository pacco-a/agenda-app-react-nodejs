import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getHello(): Object {
        return {
            name: "pacco",
            age: 20,
            job: "dev student",
        };
    }
}
