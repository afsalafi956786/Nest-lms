import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';
import { AuthedRequest } from 'src/common.types';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(
    createCourseDto: CreateCourseDto,
    userId: string,
  ): Promise<{ success: boolean; message: string; statusCode: number }> {
    console.log(userId, 'userId');
    const exist_course = await this.courseModel.findOne({
      name: createCourseDto.name,
    });

    if (exist_course) {
      throw new ConflictException('Course already exist');
    }

    await this.courseModel.create({
      name: createCourseDto.name,
      description: createCourseDto.description ?? null,
      level: createCourseDto.level,
      price: createCourseDto.price,
    });

    return {
      success: true,
      message: 'Course created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
