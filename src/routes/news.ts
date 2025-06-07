import { Router } from "express";
import NewsController from "../controllers/news.controller";
import NewsService from "../services/news.service";
import Verification from "../middleware/verification";
import NewsRepository from "../repositories/news";

const router = Router();

const newsRepository = new NewsRepository();
const newsService = new NewsService(newsRepository);
const newsController = new NewsController(newsService);


router.post("/", Verification.verifyToken, newsController.createNews.bind(newsController));
router.get("/", newsController.getAllNews.bind(newsController));
router.get("/:id", newsController.getNewsById.bind(newsController));
router.put("/:id", Verification.verifyToken, newsController.updateNews.bind(newsController));
router.delete("/:id", Verification.verifyToken, newsController.deleteNews.bind(newsController));

export default router; 