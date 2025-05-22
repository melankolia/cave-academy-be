import { NotFoundError } from '../utils/errors';
import { CreateNewsDTO, UpdateNewsDTO, News } from "../models/news.dto";
import NewsRepository from '../repositories/news';

class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async findAll(): Promise<News[]> {
    try {
      return await this.newsRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
  }

  async findById(id: number): Promise<News> {
    try {
      const news = await this.newsRepository.findById(id);
      if (!news) {
        throw new NotFoundError(`News with id ${id} not found`);
      }
      return news;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
  }

  async create(data: CreateNewsDTO): Promise<News> {
    try {
      return await this.newsRepository.create(data);
    } catch (error) {
      throw new Error(`Failed to create news: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateNewsDTO): Promise<News> {
    try {
      const news = await this.newsRepository.findById(id);
      if (!news) {
        throw new NotFoundError(`News with id ${id} not found`);
      }
      return await this.newsRepository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to update news: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const news = await this.newsRepository.findById(id);
      if (!news) {
        throw new NotFoundError(`News with id ${id} not found`);
      }
      await this.newsRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to delete news: ${error.message}`);
    }
  }
} 

export default NewsService;