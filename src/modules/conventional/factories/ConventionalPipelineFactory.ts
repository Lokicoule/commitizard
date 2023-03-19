import { ConventionalHandler } from "../handlers/ConventionalHandler";

export interface ConventionalPipelineFactory {
  createPipeline(): ConventionalHandler;
}
