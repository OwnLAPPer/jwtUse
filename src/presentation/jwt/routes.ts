import { Router } from "express";
import { JwtController } from "./controller";
import { UserServices } from "../services/user.services";




export class JWTRoutes{


    static get routes():Router{

        const router = Router();
        const service= new UserServices()
        const jwtController= new JwtController(service);

        router.post('/register', jwtController.register );
        router.get('/login/:token', jwtController.login );

        return router;
    }
}
