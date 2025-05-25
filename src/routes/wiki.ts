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

router.get('/', (req, res) => wikiController.findAll(req, res));
router.get('/:id', (req, res) => wikiController.findById(req, res));
router.post('/', Verification.verifyToken, (req, res) => wikiController.create(req, res));
router.put('/:id', Verification.verifyToken, (req, res) => wikiController.update(req, res));
router.delete('/:id', Verification.verifyToken, (req, res) => wikiController.delete(req, res));

export default router;