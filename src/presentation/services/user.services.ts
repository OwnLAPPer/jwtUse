import { JwtAdapter } from "../../config/jwt-adapter";
import { UserModel } from "../../data/mongo/models/user";
import { CreateUserDto } from "../../domain/dto/user/createUser.dto";
import { LoginUserDto } from "../../domain/dto/user/login.dto";




export class UserServices{

    constructor(){}


    async createUser(userDto:CreateUserDto){
        const existUser= await UserModel.findOne({email: userDto.email});
        if (existUser) throw new Error('email already exist!');

        //*try para hacer grabaciones en bases de datos
        try {


            const user = new UserModel(userDto);
           
            await user.save();

            //?jwt para autenticacion
            const token = await JwtAdapter.generateToken({id:user.id});
            if (!token) throw new Error('error while genereting token');


            return {
                user: user,
                token: token,
            };
        
        } catch (error) {
            return error;
        }


    }

    public async loginUser(Dto:LoginUserDto,tokenValidator:string){

        const user = await UserModel.findOne({email: Dto.email});
        if (!user) throw new Error('email/user not found');
        
        const password = await UserModel.findOne({email:Dto.email});
        if (!(password?.password===Dto.password)) {
             throw new Error('password invalid')
        }

        const token = await JwtAdapter.validateToken(tokenValidator);

        if(!token) throw new Error('error while creating JWT');


        return {
            logeoExitoso: user,
            tokenValidado:token,
        }
    };

} 