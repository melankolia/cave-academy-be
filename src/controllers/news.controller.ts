import { Request, Response } from "express";
import NewsService  from "../services/news.service";
import { CreateNewsDTO, UpdateNewsDTO } from "../models/news.dto";
import { handleError } from '../utils/errorHandler';

class NewsController {
  private newsService: NewsService;

  constructor(newsService: NewsService) {
    this.newsService = newsService;
  }

  async createNews(req: Request, res: Response) {
    try {
      const data: CreateNewsDTO = req.body;
      const news = await this.newsService.create(data);
      res.status(201).json({
        status: 'success',
        data: news
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getAllNews(req: Request, res: Response) {
    try {
      const news = await this.newsService.findAll();
      res.status(200).json({
        status: 'success',
        data: news
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getNewsById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const news = await this.newsService.findById(id);
      res.status(200).json({
        status: 'success',
        data: news
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async updateNews(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateNewsDTO = req.body;
      const news = await this.newsService.update(id, data);
      res.status(200).json({
        status: 'success',
        data: news
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async deleteNews(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.newsService.delete(id);
      res.status(200).json({
        status: 'success',
        message: 'News deleted successfully'
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }
} 

export default NewsController;