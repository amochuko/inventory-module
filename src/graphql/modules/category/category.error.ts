
export class CategoryCreationError extends Error {
  constructor(message = "Failed to create category") {
    super(message);
    this.name = CategoryCreationError.name;
  }
}

export class CategoryFindAllError extends Error {
  constructor(message = "Failed to fetch categories") {
    super(message);
    this.name = CategoryCreationError.name;
  }
}

export class CategoryNotFoundError extends Error {
  constructor(message = "Category not found") {
    super(message);
    this.name = CategoryNotFoundError.name;
  }
}

export class DuplicateCategoryError extends Error {
  constructor(message = "Category already exists") {
    super(message);
    this.name = DuplicateCategoryError.name;
  }
}
