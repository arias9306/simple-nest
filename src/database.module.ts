import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe/entities/recipe.entity';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'nest',
      entities: [Todo, Recipe],
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
