import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

@Controller()
export class AppController { 
  @Get()
  index() {
    return "welcome, you're at TheBlogAPI"
  }
}
