/**
 * This is the Base model from which others model should extend
 */
export abstract class BaseModel<T> {
  /**
   * toPersistence should be implemented by the derived class
   */
  abstract toPersistence(): T;

  /**
   * Convert instance to JSON representation of model
   * @returns
   */
  toJson(): Record<string, any> {
    return {};
  }

  /**
   * Static factory function to create new instance from a DTO
   * @param dto
   */
  static createFromDTO(dto: any): any {}

  /**
   *Static factory function to rebuild an instance from persistence data (DB)
   *
   * @param data
   */
  static rebuildFromPersistence(dto: any): any {}
}
