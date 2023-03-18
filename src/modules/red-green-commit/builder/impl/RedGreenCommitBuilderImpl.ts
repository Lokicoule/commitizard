import { CommitType } from "../../../commit/types";

export interface RedGreenCommitType {
  data: string;
}

export interface RedGreenCommitFeature {
  data: string;
}

export interface RedGreenCommitSubjectOptions {
  key: string;
  value: string;
}

export interface RedGreenCommitSubject {
  feature: RedGreenCommitFeature;
  pattern: string;
  options: RedGreenCommitSubjectOptions[];
}

export interface RedGreenCommit {
  type: CommitType;
  subject: RedGreenCommitSubject;
}

export interface RedGreenCommitBuilder {
  withType(type: RedGreenCommitType): RedGreenCommitBuilder;
  withSubjectFeature(feature: RedGreenCommitFeature): RedGreenCommitBuilder;
  withSubjectPattern(subject: string): RedGreenCommitBuilder;
  withSubjectOptions(
    options: RedGreenCommitSubjectOptions[]
  ): RedGreenCommitBuilder;
  build(): RedGreenCommit;
}

export class RedGreenCommitBuilderImpl implements RedGreenCommitBuilder {
  private type!: RedGreenCommitType;
  private feature!: RedGreenCommitFeature;
  private subjectPattern!: string;
  private subjectOptions: RedGreenCommitSubjectOptions[] = [];

  public withType(type: RedGreenCommitType): RedGreenCommitBuilder {
    this.type = type;
    return this;
  }

  public withSubjectFeature(
    feature: RedGreenCommitFeature
  ): RedGreenCommitBuilder {
    this.feature = feature;
    return this;
  }

  public withSubjectPattern(subject: string): RedGreenCommitBuilder {
    this.subjectPattern = subject;
    return this;
  }

  public withSubjectOptions(
    options: RedGreenCommitSubjectOptions[]
  ): RedGreenCommitBuilder {
    this.subjectOptions = options;
    return this;
  }

  public build(): RedGreenCommit {
    this.validate();

    return {
      type: this.type,
      subject: {
        feature: this.feature,
        pattern: this.subjectPattern,
        options: this.subjectOptions,
      },
    };
  }

  private validate(): void {
    if (!this.type) {
      throw new Error("Commit type not set!");
    }

    if (!this.feature) {
      throw new Error("Commit feature not set!");
    }

    if (!this.subjectPattern) {
      throw new Error("Commit subject pattern not set!");
    }
  }
}
