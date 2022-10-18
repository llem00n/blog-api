import { Controller, Post, UseGuards, Request, Body, Put, Get, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/models/user.model';
import { RegisterUserDto } from './dto/register.dto';
import { validateSync } from 'class-validator'

@Controller('users')
export class UsersController {
	constructor(
		private authService: AuthService) { }

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Request() req: any) {
		return this.authService.login(req.user);
	}

	@Post('register')
	async register(@Body() requestData: RegisterUserDto) {
		const errors = validateSync(requestData)
		if (errors.length) {
			throw new BadRequestException(errors)
		}

		const user = new User();
		user.password = requestData.password
		user.username = requestData.username
		user.posts = []

		return this.authService.register(user)
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	async me(@Request() req: any) {
		return req.user;
	}
}