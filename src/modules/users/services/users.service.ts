import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { RegisterUserDto } from '../dto/register.dto';
import { DataSource, Repository } from 'typeorm';
import { PasswordService } from 'src/auth/password.service';

@Injectable()
export class UsersService {
	private repository: Repository<User>;

	constructor(dataSource: DataSource, private passwordService: PasswordService) {
		this.repository = dataSource.getRepository(User)
	}

	async addUser(userData: RegisterUserDto) {
		const user = new User()
		user.username = userData.username
		user.password = this.passwordService.hash(userData.password)

		return await this.repository.save(user)
	}

	async getUser(username: string): Promise<User> {
		return this.repository.findOneBy({
			username
		});
	}
}
