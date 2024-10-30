import { Request, Response } from "express";
import { CreateUserDto } from "../../domain/dto/user/createUser.dto";
import { UserServices } from "../services/user.services";
import { LoginUserDto } from "../../domain/dto/user/login.dto";



export class JwtController{

    constructor(
        public readonly userService:UserServices,
    ){}

    public register = (req:Request,res:Response)=>{
       
        const [error,registerDto]=CreateUserDto.create(req.body);
        if (error) {
            return res.status(400).json({error});
        }

        this.userService.createUser(registerDto!)
            .then((user:any)=> res.json(user))
            .catch((error:Error)=> res.json(error));

    }
    public login = (req:Request,res:Response)=>{
        const [error,loginDto]=LoginUserDto.create(req.body);
        if (error) {
            return res.status(400).json({error});
        }
        const{token}=req.params;

        this.userService.loginUser(loginDto!,token)
            .then(user=> res.json(user))
            .catch((error:Error)=> res.json(error));
    }

}