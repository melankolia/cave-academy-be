import { Router } from 'express';
import TopicController from '../controllers/topic.controller';
import TopicService from '../services/topic.service';
import TopicRepository from '../repositories/topic';
import WikiRepository from '../repositories/wiki';
import Verification from '../middleware/verification';

const router = Router();

const topicRepository = new TopicRepository();
const wikiRepository = new WikiRepository();
const topicService = new TopicService(topicRepository, wikiRepository);
const topicController = new TopicController(topicService);

router.get('/:id', topicController.findById.bind(topicController));
router.delete('/:id', Verification.verifyToken, topicController.delete.bind(topicController));

export default router;