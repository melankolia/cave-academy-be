import { NotFoundError } from '../utils/errors';
import { CreateEventDTO, UpdateEventDTO, Event } from "../models/event.dto";
import EventRepository from '../repositories/event';

class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAll(): Promise<Event[]> {
    try {
      return await this.eventRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }

  async findById(id: number): Promise<Event> {
    try {
      const event = await this.eventRepository.findById(id);
      if (!event) {
        throw new NotFoundError(`Event with id ${id} not found`);
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to fetch event: ${error.message}`);
    }
  }

  async create(data: CreateEventDTO): Promise<Event> {
    try {
      // Validate dates
      if (new Date(data.startDate) > new Date(data.endDate)) {
        throw new Error('Start date cannot be after end date');
      }
      
      return await this.eventRepository.create(data);
    } catch (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateEventDTO): Promise<Event> {
    try {
      const event = await this.eventRepository.findById(id);
      if (!event) {
        throw new NotFoundError(`Event with id ${id} not found`);
      }

      // Validate dates if both are provided
      if (data.startDate && data.endDate) {
        if (new Date(data.startDate) > new Date(data.endDate)) {
          throw new Error('Start date cannot be after end date');
        }
      }

      return await this.eventRepository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to update event: ${error.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const event = await this.eventRepository.findById(id);
      if (!event) {
        throw new NotFoundError(`Event with id ${id} not found`);
      }
      await this.eventRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  }
}

export default EventService; 