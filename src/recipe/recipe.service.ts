import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = new Recipe();
    recipe.name = createRecipeDto.name;
    recipe.description = createRecipeDto.description;
    recipe.isFavorite = createRecipeDto.isFavorite;

    return await this.recipeRepository.save(createRecipeDto);
  }

  async findAll(filter: FilterRecipeDto) {
    if (filter?.criteria) {
      return await this.recipeRepository.find({
        where: [
          {
            name: ILike(`%${filter.criteria}%`),
          },
          {
            description: ILike(`%${filter.criteria}%`),
          },
        ],
      });
    }
    return await this.recipeRepository.find();
  }

  async findOne(id: number) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found.`);
    }
    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const changed = await this.recipeRepository.update(id, updateRecipeDto);

    if (!changed.affected) {
      throw new NotFoundException(`Recipe with id ${id} not found.`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const removed = await this.recipeRepository.delete(id);
    if (!removed.affected) {
      throw new NotFoundException(`Recipe with id ${id} not found.`);
    }
  }
}
