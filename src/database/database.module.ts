import { Module } from '@nestjs/common';
import { DynamicModule, Provider } from '@nestjs/common/interfaces';
import { PostsService } from './services/posts.service';
import { UsersService } from './services/users.service';

type Providers = UsersService | PostsService;

@Module({
	providers: [PostsService, UsersService],
	exports: [PostsService, UsersService]
})
export class DatabaseModule {
	static forFeature(services: Provider<Providers>[]): DynamicModule {
		return {
			module: DatabaseModule,
			providers: services,
			exports: services,
		}
	}
}
