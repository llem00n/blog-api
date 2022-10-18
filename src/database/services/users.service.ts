import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
	private repository: Repository<User>;
	private salt: string;

	constructor(dataSource: DataSource) {
		this.repository = dataSource.getRepository(User)
		this.salt = bcrypt.genSaltSync(Number.parseInt(process.env.BCRYPT_SALT_ROUNDS))
	}

	async addUser(user: User) {
		user.password = bcrypt.hashSync(user.password, this.salt)
		return await this.repository.save(user)
	}

	async getUser(username: string): Promise<User> {
		return this.repository.findOneBy({
			username
		});
	}
}
