import { Category } from "../../generated-types/graphql";

type CreateArgs = Pick<Category, "abbrevCode" | "name" | "description">;
type FilterOption = {
  filterBy: string;
  skip: number;
  take: number;
};
export interface ICategory {
  create(args: CreateArgs): Promise<Category>;

  findAll(args?: FilterOption): Promise<Category[]>;

  findById(id: string): Promise<Category>;

  updateById(id: string, body: Partial<Category>): Promise<Category>;

  deleteById(id: string): Promise<Boolean> | void;
}
