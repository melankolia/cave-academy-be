import WikiRepository from "../repositories/wiki";
import TopicRepository from "../repositories/topic";
import { Wiki, CreateWikiDTO, UpdateWikiDTO } from "../models/wiki.dto";
import { Topic } from "../models/topic.dto";
import { NotFoundError } from '../utils/errors';

interface WikiWithTopic extends Wiki {
  topicId: number;
}

class WikiService {
  constructor(
    private readonly wikiRepository: WikiRepository, 
    private readonly topicRepository: TopicRepository) {}

  async findAll(): Promise<Object[]> {
    return await this.topicRepository.findAll();
  }

  async findById(id: number): Promise<Object> {
    const wiki = await this.wikiRepository.findById(id) as WikiWithTopic;
    if (!wiki) {
      throw new NotFoundError(`Wiki with id ${id} not found`);
    }
    return wiki;
  }

  async create(wiki: CreateWikiDTO): Promise<Object> {
    const payloadTopic = {
      title: wiki.title,
      description: wiki.description,
      content: wiki.content,
      userId: wiki.userId,
    }
  
    const topicId = await this.topicRepository.create(payloadTopic);

    await this.wikiRepository.create(wiki, topicId);

    return topicId;
  }

  async update(id: number, data: UpdateWikiDTO): Promise<boolean> {
    try {
      // Check if topic exists
      const topic = await this.topicRepository.findById(id)
      if (!topic) {
        throw new NotFoundError(`Topic with id ${id} not found`);
      }

      const payloadTopic = {
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        imageUrl: data.imageUrl,
        content: data.content,
      }

      await this.topicRepository.update(id, payloadTopic);

      for (let i = 0; i < data.wiki?.length; i++) {
        const payloadWiki = {
          title: data.wiki[i].title,
          description: data.wiki[i].description,
          thumbnailUrl: data.wiki[i].thumbnailUrl,
          imageUrl: data.wiki[i].imageUrl,
          content: data.wiki[i].content,
          updatedAt: new Date(),
        }

        await this.wikiRepository.update(payloadWiki, data.wiki[i].id);
      }

      return true

    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to update wiki: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const wiki = await this.wikiRepository.findById(id) as WikiWithTopic;
      
      if (!wiki) {
        throw new NotFoundError(`Wiki with id ${id} not found`);
      }

      // Delete the wiki
      await this.wikiRepository.delete(id);

      return true
      
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error(`Failed to delete wiki: ${error.message}`);
    }
  }
}

export default WikiService;