import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/database/services/users.service';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.getUser(username);
		if (user && bcrypt.compareSync(password, user.password)) {
			const { password, ...result } = user;
			return result
		}

		return null;
	}

	async login(user: User) {
		const payload = { username: user.username, sub: user.id }

		return {
			access_token: this.jwtService.sign(payload)
		}
	}

	async register(user: User) {
		user = await this.usersService.addUser(user);
		return await this.login(user);
	}
}
