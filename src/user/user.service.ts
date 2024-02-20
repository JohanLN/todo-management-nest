import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  create(user: User) {
    return this.userRepository.save(user);
  }

  async update(id: number, { name, email }: User) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    return this.userRepository.save(user);
  }

  delete(id: number) {
    return this.userRepository.delete(id).then(() => {});
  }
}
