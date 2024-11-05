import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuidv4(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand=>brand.id === id);
    if(!brand) throw new NotFoundException(`Brand with id ${id} not found`)
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id);
    this.brands.map(brand=>{
      if(brand.id === id){
        brandDb.updatedAt = new Date().getTime();
        brandDb = {...brandDb,...updateBrandDto};
        return brandDb;
      };
      return brand;
    })
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand=>brand.id !== id);
  };

  fillBrandsWithSeedData(brands: Brand[]){
    this.brands = brands;
  }
}
