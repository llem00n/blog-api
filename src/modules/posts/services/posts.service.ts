import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/models/post.model';
import { User } from 'src/models/user.model';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
	private repository: Repository<Post>;
	private usersRepository: Repository<User>

	constructor(dataSource: DataSource) {
		this.repository = dataSource.getRepository(Post)
		this.usersRepository = dataSource.getRepository(User)
	}

	async addPost(postData: any) {
		const post = new Post()
		post.body = postData.body
		post.title = postData.title
		post.user = await this.usersRepository.findOneBy({ username: postData.username })

		const {user, ...result} = await this.repository.save(post)
		return result;
	}

	async deletePost(postId: number) {
		return await this.repository.delete(postId);
	}

	async updatePost(postData: UpdatePostDto) {
		return await this.repository.update(postData.id, postData)
	}

	async getAllPosts(username: string) {
		return await this.repository.createQueryBuilder('post')
			.innerJoin("post.user", "user", "user.username = :username", { username })
			.select(["post.id", "post.title", "post.body"])
			.getMany()
	}

	async getPost(options: FindOneOptions<Post>) {
		return await this.repository.findOne(options)
	}
}
