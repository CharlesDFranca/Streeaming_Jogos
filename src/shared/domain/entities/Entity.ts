export abstract class Entity<Props> {
  protected props: Props;

  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  public constructor(
    id: string,
    props: Props,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._id = id;
    this.props = props;

    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }
}
