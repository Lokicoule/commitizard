export interface Command {
  run(): Promise<void> | void;
}
