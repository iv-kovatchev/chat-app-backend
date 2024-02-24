import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password)
    })
  }

  findAll() {
    return this.usersRepository.find({})
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ _id: id });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.findOneAndUpdate({ _id: id }, {
      $set: {
        ...updateUserInput,
        password: await this.hashPassword(updateUserInput.password)
      }
    })
  }

  remove(id: string) {
    return this.usersRepository.findOneAndDelete({ _id: id });
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
}
