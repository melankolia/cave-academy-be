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

router.get('/:id', (req, res) => topicController.findById(req, res));
router.delete('/:id', Verification.verifyToken, (req, res) => topicController.delete(req, res));

export default router;