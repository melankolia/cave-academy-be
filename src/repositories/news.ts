import { eq } from "drizzle-orm";
import { db } from "../db";
import { newsTable } from "../schemas/news";
import { CreateNewsDTO, UpdateNewsDTO, News } from "../models/news.dto";
import { desc } from "drizzle-orm";
import { usersTable } from "../schemas/user";

class NewsRepository {
  async findAll(): Promise<News[]> {
    const news = await db.query.newsTable.findMany({
      orderBy: desc(newsTable.createdAt),
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

    return news.map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      description: item.description,
      imageUrl: item.imageUrl,
      author: item.author,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    } as News));
  }

  async findById(id: number): Promise<News | null> {
    const news = await db.query.newsTable.findFirst({
      where: eq(newsTable.id, id),
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
    
    if (!news) return null;

    return {
      id: news.id,
      title: news.title,
      imageUrl: news.imageUrl,
      content: news.content,
      description: news.description,
      author: news.author,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    } as News;
  }

  async create(data: CreateNewsDTO): Promise<News> {
    const result = await db
      .insert(newsTable)
      .values({
        title: data.title,
        content: data.content,
        description: data.description,
        imageUrl: data.imageUrl,
        authorId: data.authorId
      })
      .returning();
    
    const news = result[0];
    
    // Fetch the complete news with author
    return this.findById(news.id) as Promise<News>;
  }

  async update(id: number, data: UpdateNewsDTO): Promise<News> {
    const result = await db
      .update(newsTable)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(newsTable.id, id))
      .returning();
    
    const news = result[0];
    return {
      id: news.id,
      title: news.title,
      content: news.content,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    } as News;
  }

  async delete(id: number): Promise<void> {
    await db
      .delete(newsTable)
      .where(eq(newsTable.id, id));
  }
}

export default NewsRepository; 