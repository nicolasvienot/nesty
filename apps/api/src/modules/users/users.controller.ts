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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.types';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Available to all
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Secured for logged in users (TO CHANGE)
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Secured for logged in users
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  // Secured for logged in users
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ): Promise<User | null> {
    return this.usersService.update(id, updateUserDto);
  }

  // Secured for logged in users
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string): Promise<User | null> {
    return this.usersService.remove(id);
  }
}
