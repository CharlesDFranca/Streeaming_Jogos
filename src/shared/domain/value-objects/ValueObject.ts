type ValueObjectProps = string | number | Record<string, unknown>;

export abstract class ValueObject<Props extends ValueObjectProps> {
  protected readonly props: Readonly<Props>;

  public constructor(props: Props) {
    props = this.validate(props);
    this.props = Object.freeze(props);
  }

  protected abstract validate(props: Props): Props;

  get value(): Readonly<Props> {
    return this.props;
  }

  equals(other: ValueObject<Props>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
