export class EnumUtils {
  public static fromString<T extends { [index: string]: string }>(
    enumType: T,
    value: string
  ): T[keyof T] {
    const enumKey = Object.keys(enumType).find(
      (key) =>
        enumType[key] === value.toLowerCase() ||
        enumType[key] === value.toUpperCase()
    );

    if (!enumKey) {
      throw new Error(`Value "${value}" not found in enum`);
    }

    return enumType[enumKey] as T[keyof T];
  }

  public static toString<T extends { [index: string]: string }>(
    enumType: T,
    value: T[keyof T]
  ): string {
    const enumKey = Object.keys(enumType).find(
      (key) => enumType[key] === value
    );
    if (!enumKey) {
      throw new Error(`Value "${value}" not found in enum`);
    }
    return enumKey;
  }
}
