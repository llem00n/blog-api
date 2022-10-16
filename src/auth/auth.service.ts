import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private passwordService: PasswordService) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.getUser(username);
		if (user && this.passwordService.compare(password, user.password)) {
			const { password, ...result } = user;
			return result
		}

		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.id }

		return {
			access_token: this.jwtService.sign(payload)
		}
	}

	async register(user: any) {
		user = await this.usersService.addUser(user);
		return await this.login(user);
	}
}
