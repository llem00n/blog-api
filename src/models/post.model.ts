import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { User } from "./user.model";

@Entity('posts')
export class Post {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: 50
	})
	title: string

	@Column('text')
	body: string

	@ManyToOne(() => User, (user) => user.posts)
	@JoinColumn()
	user: User
}