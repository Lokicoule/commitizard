import { ConventionalHandler } from "../handlers/ConventionalHandler";

export interface ConventionalHandlerFactory {
  createTypeHandler(): ConventionalHandler;
  createScopeHandler(): ConventionalHandler;
  createSubjectHandler(): ConventionalHandler;
  createBreakingChangesHandler(): ConventionalHandler;
  createReferencesHandler(): ConventionalHandler;
  createBodyHandler(): ConventionalHandler;
  createFooterHandler(): ConventionalHandler;
}
