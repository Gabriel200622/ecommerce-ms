import { CategoryDtoProps } from "../interfaces";
import { BaseDto } from "./base.dto";

export class CategoryDto extends BaseDto<CategoryDtoProps> {
  name: string;
  slug: string;
  description: string;

  constructor(props: CategoryDtoProps) {
    super();
    const { name, slug, description } = this.validateProps(props, [
      "name",
      "slug",
      "description",
    ]);

    this.name = name;
    this.slug = slug;
    this.description = description;
  }
}
