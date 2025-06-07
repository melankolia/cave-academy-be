import { Request, Response } from 'express';
import TopicService from '../services/topic.service';
import { handleError } from '../utils/errorHandler';

class TopicController {
    private topicService: TopicService;

    constructor(topicService: TopicService) {
        this.topicService = topicService;
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const topic = await this.topicService.findById(id);
            res.json({
                status: 'success',
                data: topic
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.topicService.delete(id);
            res.json({
                status: 'success',
                message: 'Topic deleted successfully'
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }
}

export default TopicController;