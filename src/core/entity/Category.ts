export class Category {
  constructor(public id: string, public name: string) {}
}
export interface CreateCategoryPayload extends Omit<Category, "id"> {}
