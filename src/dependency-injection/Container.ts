export type Constructor<T> = new (...args: any[]) => T;

export interface Identifier<T> {
  name: string;
}

export class Container {
  private readonly map: Map<Identifier<any>, any>;

  constructor() {
    this.map = new Map();
  }

  public get<T>(identifier: Identifier<T>): T {
    return this.map.get(identifier);
  }

  public set<T>(identifier: Identifier<T>, value: T): void {
    this.map.set(identifier, value);
  }

  public has<T>(identifier: Identifier<T>): boolean {
    return this.map.has(identifier);
  }

  public delete<T>(identifier: Identifier<T>): void {
    this.map.delete(identifier);
  }
}

export class ContainerDI {
  private static container: Container;

  public static getContainer(): Container {
    if (!ContainerDI.container) {
      ContainerDI.container = new Container();
    }

    return ContainerDI.container;
  }
}

export function Injectable<T extends Constructor<{}>>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      ContainerDI.getContainer().set({ name: constructor.name }, this);
    }
  };
}

export function Inject<T>(identifier: Identifier<T>) {
  return function (target: any, propertyKey: string) {
    const container = ContainerDI.getContainer();
    const instance = container.get(identifier);

    if (instance) {
      target[propertyKey] = instance;
    }
  };
}
