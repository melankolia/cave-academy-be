import { Request, Response } from 'express';
import WikiService from "../services/wiki.service";
import { handleError } from '../utils/errorHandler';
import { CreateWikiDTO, UpdateWikiDTO } from '../models/wiki.dto';

class WikiController {
    private wikiService: WikiService;

    constructor(wikiService: WikiService) {
        this.wikiService = wikiService;
    }

    async findAll(req: Request, res: Response) {
        try {
            const wikis = await this.wikiService.findAll();
            res.json({
                status: 'success',
                data: wikis
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const wiki = await this.wikiService.findById(id);
            res.json({
                status: 'success',
                data: wiki
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data: CreateWikiDTO = {
                ...req.body,
                userId: req.user.id
            };
            const wiki = await this.wikiService.create(data);
            res.status(201).json({
                status: 'success',
                data: {
                    id: wiki
                }
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const data: UpdateWikiDTO = {
                ...req.body,
                userId: req.user.id
            };
            const wiki = await this.wikiService.update(id, data);
            res.json({
                status: 'success',
                data: wiki
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await this.wikiService.delete(id);
            res.json({
                status: 'success',
                message: 'Wiki deleted successfully'
            });
        } catch (error) {
            handleError(error as Error, res);
        }
    }
}

export default WikiController;
