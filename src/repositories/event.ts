import { desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { eventTable } from '../schemas/event';
import { CreateEventDTO, Event, UpdateEventDTO } from '../models/event.dto';

class EventRepository {
  async findAll(): Promise<Event[]> {
    const events = await db.query.eventTable.findMany({
        orderBy: desc(eventTable.createdAt),
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              username: true,
              role: true,
            }
          }
        }
      });

    return events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      content: event.content,
      startDate: event.startDate,
      endDate: event.endDate,
      level: event.level,
      isOnline: event.isOnline,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      author: event.author
    } as Event));
  }

  async findById(id: number): Promise<Event | null> {
    const event = await db.query.eventTable.findFirst({
      where: eq(eventTable.id, id),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            username: true,
            role: true,
          }
        }
      }
    });
    
    if (!event) return null;

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      content: event.content,
      startDate: event.startDate,
      endDate: event.endDate,
      level: event.level,
      isOnline: event.isOnline,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      author: event.author
    } as Event;
  }

  async create(data: CreateEventDTO): Promise<Event> {
    const result = await db
      .insert(eventTable)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return result[0];
  }

  async update(id: number, data: UpdateEventDTO): Promise<Event> {
    const result = await db
      .update(eventTable)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(eventTable.id, id))
      .returning();
    
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db
      .delete(eventTable)
      .where(eq(eventTable.id, id));
  }
}

export default EventRepository; 