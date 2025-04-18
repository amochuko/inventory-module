import { Injectable } from "graphql-modules";
import { Link } from "../../generated-types/graphql";
import FeedDAO from "./feed.dao";

@Injectable()
export class FeedService {
  constructor(private feedDAO: FeedDAO) {}

  async create(args: Pick<Link, "url" | "description">): Promise<Link> {
    return await this.feedDAO.create(args);
  }

  async getAll(): Promise<Link[] | []> {
    return await this.feedDAO.getAll();
  }

  async getById(id: string): Promise<Link | undefined> {
    return await this.feedDAO.getById({ feed_id: id });
  }

  async updateById(id: string, link: Partial<Link>) {
    return await this.feedDAO.updateById({ feed_id: id, feed: link });
  }

  async deleteById(id: string): Promise<"Ok" | string> {
    return await this.feedDAO.deleteById({ feed_id: id });
  }
}
