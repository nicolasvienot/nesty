import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseZodValidation } from '@/shared/zod/use-zod-validation.decorator';
import { UsersService } from '@/modules/users/users.service';
import {
  CreateUserDto,
  CreateUserSchema,
} from '@/modules/users/dto/create-user.dto';
import {
  UpdateUserDto,
  UpdateUserSchema,
} from '@/modules/users/dto/update-user.dto';
import { User } from '@/modules/users/users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseZodValidation(CreateUserSchema)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseZodValidation(UpdateUserSchema)
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<User | null> {
    return this.usersService.remove(id);
  }
}
