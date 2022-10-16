import { Entity, OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Post } from "./post.model";

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: 20,
		unique: true
	})
	username: string

	@Column()
	password: string

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[]
}