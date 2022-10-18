import { Controller, ForbiddenException } from '@nestjs/common';
import { Body, Get, Param, Patch, Post, UseGuards, Request, Delete } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from 'src/database/services/posts.service';

@Controller('posts')
export class PostsController {
	constructor(private postsService: PostsService) { }

	@Get(':username')
	async getAllPosts(@Param('username') username: string) {
		return this.postsService.getAllPosts(username)
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	async createPost(@Request() req, @Body() postData: CreatePostDto) {
		return this.postsService.addPost({
			...postData,
			username: req.user.username
		})
	}

	@UseGuards(AuthGuard('jwt'))
	@Patch('update')
	async updatePost(@Request() req, @Body() postData: UpdatePostDto) {
		const post = await this.postsService.getPost({ where: { id: postData.id }, loadRelationIds: true })
		if (post.user != req.user.id)
			throw new ForbiddenException("You're not the owner of the post")

		post.body = postData.body,
		post.title = postData.title
		return await this.postsService.updatePost(post)
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete('delete/:postId')
	async deletePost(@Request() req, @Param('postId') postId: number) {
		const post = await this.postsService.getPost({ where: { id: postId }, loadRelationIds: true })
		if (post.user != req.user.id)
			throw new ForbiddenException("You're not the owner of the post")

		return await this.postsService.deletePost(postId);
	}
}
