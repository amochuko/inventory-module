import { Prisma, PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import { Injectable } from "graphql-modules";
import { applyTakeConstraints } from "../../../common/utils/helpers";
import { InputMaybe } from "../../generated-types/graphql";

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaClient) {}

  async feeds() {
    return await this.prisma.feed.findMany();
  }
  async feed(
    filterNeedle?: InputMaybe<string> | undefined,
    skip?: number |undefined,
    take?: number|undefined
  ) {
    return await this.prisma.feed.findMany({
      where: filterNeedle
        ? {
            OR: [
              { description: { contains: filterNeedle } },
              { url: { contains: filterNeedle } },
            ],
          }
        : {},
      skip,
      take: applyTakeConstraints({
        min: 1,
        max: 50,
        value: take ?? 30,
      }),
    });
  }
  async getFeedById(id: number) {
    return await this.prisma.feed.findFirst({
      where: { id },
    });
  }

  async create(description: string, url: string) {
    return await this.prisma.feed.create({
      data: { description, url },
    });
  }
  async commentsOnFeedID(feedID: number) {
    return await this.prisma.comment.findMany({
      where: { feedID },
      orderBy: { createdAt: "desc" },
    });
  }

  async commentById(id: number) {
    return await this.prisma.comment.findFirst({
      where: { id },
    });
  }

  async addComment(body: string, feedID: number) {
    return await this.prisma.comment
      .create({
        data: {
          body,
          feedID,
          createdAt: new Date(),
        },
      })
      .catch((err: unknown) => {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2003"
        ) {
          return Promise.reject(
            new GraphQLError(
              `Cannot post comment on non-existing feed with id '${feedID}'`
            )
          );
        }
        return Promise.reject(err);
      });
  }
}
