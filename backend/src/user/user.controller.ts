import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserEntityDto } from './dto/create-user-entity.dto';
import { CreateAdminEntityDto } from './dto/create-admin-entity.dto';
import { User, Role } from '../entities/user.entity';
import { Roles } from '../guard/role.decorator';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User as UserDecorator } from '../decorator/user.decorator';
import { JwtToken } from '../jwt-auth/dto/jwt-token.dto';
import { UserArrayDto } from './dto/user-array.dto';
import { UserWithCreditArrayDto } from './dto/user-with-credit-array.dto';

@ApiUseTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Get()
    async list(): Promise<UserArrayDto> {
        const users = await this.userService.findUsers({});
        return { users };
    }

    @ApiBearerAuth()
    @Roles(Role.SUPERUSER, Role.ADMIN)
    @Get('credit')
    async listUserWithCredit(): Promise<UserWithCreditArrayDto> {
        const users = await this.userService.findUsersWithCredit();
        return { users };
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.ADMIN, Role.SUPERUSER)
    @Get('profile')
    async profile(@UserDecorator() user: JwtToken): Promise<User> {
        return await this.userService.findUser({
            key: { nationalID: user.nationalID },
        });
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.SUPERUSER)
    @Get('creditHistory')
    async creditHistory(@UserDecorator() user: JwtToken): Promise<User> {
        return this.userService.findUser({
            key: {
                nationalID: user.nationalID,
            },
            joinWith: ['creditUsages'],
        });
    }

    @Post('register')
    async registerUser(@Body() body: CreateUserEntityDto): Promise<User> {
        const user = await this.userService.create(body.nationalID, body.firstName, body.lastName, body.phone, body.authenticationID);
        return user;
    }

    @Post('registerAdmin')
    async registerAdmin(@Body() body: CreateAdminEntityDto): Promise<User> {
        const user = await this.userService.createAdmin(body.nationalID, body.firstName, body.lastName, body.phone, body.authenticationID);
        return user;
    }
}
