import { Request, Response } from "express";
import EventService from "../services/event.service";
import { CreateEventDTO, UpdateEventDTO } from "../models/event.dto";
import { handleError } from '../utils/errorHandler';

class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const events = await this.eventService.findAll();
      res.status(200).json({
        status: 'success',
        data: events
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const event = await this.eventService.findById(id);
      res.status(200).json({
        status: 'success',
        data: event
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const data: CreateEventDTO = {
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        authorId: req.user.id
      };
      
      const event = await this.eventService.create(data);
      res.status(201).json({
        status: 'success',
        data: event
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateEventDTO = {
        ...req.body,
        startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
        authorId: req.user.id
      };
      
      const event = await this.eventService.update(id, data);
      res.status(200).json({
        status: 'success',
        data: event
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.eventService.delete(id);
      res.status(200).json({
        status: 'success',
        message: 'Event deleted successfully'
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }
}

export default EventController; 