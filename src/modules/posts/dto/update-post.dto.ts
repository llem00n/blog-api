import { IsInt, IsString, Length, Min, MinLength } from "class-validator"

export class UpdatePostDto {
	@IsInt()
	@Min(1)
	id: number
	
	@IsString()
	@Length(1, 50)
	title: string

	@IsString()
	@MinLength(10)
	body: string
}