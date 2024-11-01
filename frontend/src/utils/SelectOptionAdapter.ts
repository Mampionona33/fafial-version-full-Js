class SelectOptionAdapter {
  constructor() {}

  public static adapt<T extends { id: K; name: string }, K>(
    items: T[]
  ): { label: string; value: K }[] {
    return items.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }
}

export default SelectOptionAdapter;
