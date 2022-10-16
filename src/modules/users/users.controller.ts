import { Controller, Post, UseGuards, Request, Body, Put, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from './dto/register.dto';

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
	async register(@Body() registerDto: RegisterUserDto) {
		return this.authService.register(registerDto)
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	async me(@Request() req: any) {
		return req.user;
	}
}