import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  findAll(){
    return this.cars;
  };

  findOneById(id: string){
    const car = this.cars.filter((car)=>car.id === id)[0];
    if(!car){
      throw new NotFoundException(`Car with id '${id}' not found`);
    }
    return car;
  };

  create(createCarDto: CreateCarDto){
    const newCar: Car = {
      ...createCarDto,
      id: uuidv4()
    }
    this.cars.push(newCar);
    return newCar;
  };

  update(id: string, updateCarDto: UpdateCarDto){
    
    let carDb = this.findOneById(id);
    
    if(updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car id is not valid`);

    this.cars = this.cars.map(car=>{
      if(car.id === id){
        carDb = {
          ...carDb,
          ...updateCarDto,
          id
        }
        return carDb;
      }
      return car;
    })

    return carDb;
  };

  delete(id: string){
    this.findOneById(id);
    this.cars = this.cars.filter(car=>car.id !== id);
  };
  
  fillCarsWithSeedData(cars: Car[]){
    this.cars = cars;
  }

};
