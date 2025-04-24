type OrNull<T> = T | null;
type OneOrMany<T> = T | T[];

export interface filterOptions {
  filterBy?: string;
  take?: number;
  skip: number;
}

/**
 * Interface for Data Access Object
 */
export interface DAO<T> {
  create(args: T): Promise<T>;

  findAll(args?: filterOptions): Promise<T[]>;

  findById(id: string): Promise<T>;

  updateById(id: string, body: Partial<T>): Promise<T>;

  deleteById(id: string): Promise<OrNull<T>>;
}
