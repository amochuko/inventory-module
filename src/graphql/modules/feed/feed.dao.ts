import { Injectable } from "graphql-modules";
import { sql } from "../../../config/database/sqlConnection";
import { Link } from "../../generated-types/graphql";
import { FeedModule } from "./generated-types/module-types";

@Injectable()
export default class FeedDAO {
  async create(
    args: Pick<Link, "url" | "description">
  ): Promise<FeedModule.Link> {
    try {
      const result = await sql({
        query: `INSERT INTO feeds (url, description) VALUES ($1, $2) RETURNING *;`,
        params: [args.url, args.description],
      });

      if (!result.rowCount) {
        throw new Error("Failed to create feed");
      }

      return result.rows[0];
    } catch (err) {
      if (err instanceof Error) {
        console.error("FeedService.create", err.message);
        throw `FeedService.create: ${err.message}`;
      }

      throw new Error("Failed to create feed");
    }
  }

  async getAll(): Promise<Link[]> {
    try {
      const result = await sql({
        query: `SELECT * FROM feeds
            ORDER BY created_at DESC`,
        params: [],
      });

      return result.rows;
    } catch (err) {
      if (err instanceof Error) {
        throw err.message;
      }

      throw new Error("Error fetching feeds");
    }
  }

  async getById(args: Pick<Link, "feed_id">): Promise<Link> {
    const result = await sql({
      query: `SELECT * FROM feeds
        WHERE feed_id = ($1)`,
      params: [args.feed_id],
    });

    return result.rows[0];
  }

  /**
   * Fetches User object
   * @param {number} limit  to limit returned row
   */
  async updateById(args: {
    feed_id: string;
    feed: Partial<Link>;
  }): Promise<Link | null> {
    const keys = Object.keys(args.feed) as (keyof typeof args.feed)[];

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const values = keys.map((key) => args.feed[key]);

    const result = await sql({
      query: `
      UPDATE feeds
        SET ${setClause}
      WHERE feed_id = $${keys.length + 1}
      RETURNING *`,
      params: [...values, args.feed_id],
    });

    const changedRowCount = result.rowCount ?? 0;

    return changedRowCount === 0 ? null : result.rows[0];
  }

  async deleteById(args: Pick<Link, "feed_id">): Promise<string> {
    try {
      const result = await sql({
        query: `DELETE FROM TABLE
                  WHERE feed_id = ($1)`,
        params: [args.feed_id],
      });

      return result.rowCount === 0 ? "Not Found" : "Ok";
    } catch (err) {
      if (err instanceof Error) {
        throw err.message;
      }

      throw new Error("FeedDAO.delete: failed to delete");
    }
  }
}
