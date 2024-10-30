


export class CreateUserDto {

    private constructor(
        public readonly name:string,
        public readonly email:string,
        public readonly password: string,
    ){}

    static create(object: {[key:string]:any}):[string?,CreateUserDto?]{

        const {name,email,password}= object;

        if (!name) return ['missing name',undefined];
        if (!email) return ['missing email',undefined];
        if (!email) return ['Email is required',undefined];
        if (!password) return ['missing password',undefined];
        if (password.length < 6) return ['Password too short',undefined];

        return[undefined,new CreateUserDto(name,email,password)];
    }
}