import { eq } from 'drizzle-orm';
import { db } from '../db';
import { Wiki, CreateWikiDTO } from '../models/wiki.dto';
import { wikiTable } from '../schemas/wiki';

class WikiRepository {
  async findAll(): Promise<Wiki[]> {
    return await db.query.wikiTable.findMany({
      with: {
        topic: true,
        user: true,
      },
    });
  }
  async findById(id: number): Promise<Wiki | null> {
    return await db.query.wikiTable.findFirst({
      where: eq(wikiTable.id, id),
      with: {
        user: true,
        topic: true
      }
    });
  }

  async create(payloadWiki: CreateWikiDTO, topicId: number): Promise<number> {

    const payloadWikis = payloadWiki.wikis.map((wiki) => ({
      ...wiki,
      userId: payloadWiki.userId,
      topicId: topicId
    }));

    const [wiki] = await db.insert(wikiTable).values(payloadWikis).returning();
    return wiki.id
  }

  async createOne(wiki: Wiki): Promise<number> {
    const [createdWiki] = await db.insert(wikiTable).values(wiki).returning();
    return createdWiki.id;
  }

  async update( payloadWiki: Partial<Wiki>, id: number): Promise<boolean> {
    const [updatedWiki] = await db.update(wikiTable).set(payloadWiki).where(eq(wikiTable.id, id)).returning();
    return true;
  }

  async delete(id: number): Promise<void> {
    await db.delete(wikiTable).where(eq(wikiTable.id, id));
  }
}

export default WikiRepository;