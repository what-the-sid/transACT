export type AppEntity = "profile" | "wallet" | "payment";

export interface BuildKeyArgs {
  userId: string;
  app: AppEntity;
  id?: string;
}

export interface QueryArgs {
  PK: {
    name: string;
    value: string;
  };
  SK?: {
    name: string;
    beginsWith?: string;
    equals?: string;
  };
  indexName?: string;
  limit?: number;
}

export function getItem<T>(args: BuildKeyArgs): Promise<T>;

export function queryUserItems<T>(args: {
  userId: string;
  app: "payment" | "transaction";
}): Promise<T[]>;

export function runTransaction(actions: unknown[]): Promise<unknown>;
