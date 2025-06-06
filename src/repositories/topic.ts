import { eq } from "drizzle-orm";
import { db } from "../db";
import { Topic, CreateTopicDTO } from "../models/topic.dto";
import { topicTable } from "../schemas/wiki";

class TopicRepository {
  async findAll(): Promise<Object[]> {
    return await db.query.topicTable.findMany({
      with: {
        wiki: {
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                username: true,
                role: true,
              }
            },
          }
        }
      },
    });
  }

  async findById(id: number): Promise<Object> {
    return await db.query.topicTable.findFirst({
      where: eq(topicTable.id, id),
      with: {
        wiki: true,
      },
    });
  }

  async create(payloadTopic: CreateTopicDTO): Promise<number> {
    const [topic] = await db.insert(topicTable).values(payloadTopic).returning();
    return topic.id;
  }

  async update(id: number, payloadTopic: Partial<Topic>): Promise<number> {
    const [updatedTopic] = await db.update(topicTable).set(payloadTopic).where(eq(topicTable.id, id)).returning();
    return updatedTopic.id;
  }

  async delete(id: number): Promise<void> {
    await db.delete(topicTable).where(eq(topicTable.id, id));
  }
}

export default TopicRepository;