import TopicRepository from "../repositories/topic";
import WikiRepository from "../repositories/wiki";
import { Topic } from "../models/topic.dto";
import { NotFoundError } from '../utils/errors';

class TopicService {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly wikiRepository: WikiRepository
  ) {}
  
  async findById(id: number): Promise<Object> {
    const topic: any = await this.topicRepository.findById(id);

    topic.wikis = topic.wiki;
    delete topic.wiki;

    if (!topic) {
      throw new NotFoundError(`Topic with id ${id} not found`);
    }
    return topic;
  }

  async delete(id: number): Promise<boolean> {
    const topic: any = await this.topicRepository.findById(id);
    if (!topic) {
      throw new NotFoundError(`Topic with id ${id} not found`);
    }

    // Delete all wikis associated with the topic
    for (let i = 0; i < topic.wiki.length; i++) {
      await this.wikiRepository.delete(topic.wiki[i].id);
    }

    // Delete the topic
    await this.topicRepository.delete(id);

    return true;
  }
  
}

export default TopicService;