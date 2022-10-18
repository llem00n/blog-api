import { Length } from "class-validator"
import { IsString, MinLength } from "class-validator"

export class RegisterUserDto {
	@IsString()
	@Length(1, 20)
	username: string

	@IsString()
	@MinLength(8)
	password: string
}