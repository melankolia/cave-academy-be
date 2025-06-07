import { Router } from 'express';
import WikiController from '../controllers/wiki.controller';
import WikiService from '../services/wiki.service';
import WikiRepository from '../repositories/wiki';
import TopicRepository from '../repositories/topic';
import Verification from '../middleware/verification';

const router = Router();

const wikiRepository = new WikiRepository();
const topicRepository = new TopicRepository();
const wikiService = new WikiService(wikiRepository, topicRepository);
const wikiController = new WikiController(wikiService);

router.get('/', wikiController.findAll.bind(wikiController));
router.get('/:id', wikiController.findById.bind(wikiController));
router.post('/', Verification.verifyToken, wikiController.create.bind(wikiController));
router.put('/:id', Verification.verifyToken, wikiController.update.bind(wikiController));
router.delete('/:id', Verification.verifyToken, wikiController.delete.bind(wikiController));

export default router;