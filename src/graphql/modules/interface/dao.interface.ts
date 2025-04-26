type BoolOrNull = boolean | null;
type OneOrMany<T> = T | T[];

/**
 * Interface for Data Access Object
 */
export interface IDAO<T> {
  create(args: T): Promise<T>;

  findAll(args?: any): Promise<T[]>;

  findById(id: string): Promise<T>;

  updateById(id: string, body: Partial<T>): Promise<T>;

  deleteById(id: string): Promise<BoolOrNull>;
}
