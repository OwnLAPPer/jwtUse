import { Router } from "express";
import { JWTRoutes } from "./jwt/routes";

export class AppRoutes{


    static get routes():Router{

        const router = Router();
        
        router.use('/api/JWT',JWTRoutes.routes);
        return router;
    }
}

