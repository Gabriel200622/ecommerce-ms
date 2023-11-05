import { CategoryEntityProps } from "../interfaces";
import { BaseEntity } from "./base.entity";

export class CategoryEntity extends BaseEntity<CategoryEntityProps> {
  public id?: string;
  public name: string;
  public slug: string;
  public description?: string;

  constructor(props: CategoryEntityProps) {
    super();
    this.validateProps(props, ["name", "slug"]);

    const { id, name, slug, description } = props;

    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
  }
}
