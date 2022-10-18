import { IsString } from "class-validator"
import { Length, MinLength } from "class-validator"

export class CreatePostDto {
	@IsString()
	@Length(1, 50)
	title: string

	@IsString()
	@MinLength(10)
	body: string
}