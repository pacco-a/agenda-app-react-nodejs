import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { getConnectionManager } from "typeorm";
import { Session } from "./session/session.entity";
import { TypeormStore } from "connect-typeorm/out";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(cookieParser());

    const connManager = getConnectionManager();

    // on récupère la connexion par défaut déjà initialisée
    // - par le TypeORM Module
    const typeOrmConnection = connManager.get("default");

    const sessionRepo = typeOrmConnection.getRepository(Session);

    app.useStaticAssets(join(__dirname, "..", "..", "public"));

    app.use(
        session({
            secret: "todo change secret",
            resave: false,
            saveUninitialized: false,
            store: new TypeormStore({
                cleanupLimit: 2,
                ttl: 86400,
            }).connect(sessionRepo),
            cookie: { maxAge: 36000000 },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3002);
}
bootstrap();
