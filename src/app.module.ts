import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { RecipeModule } from './recipe/recipe.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [DatabaseModule, TodoModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
