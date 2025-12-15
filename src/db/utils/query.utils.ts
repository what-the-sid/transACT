import dynamoose from "dynamoose";
import { TransactTable } from "#db";
import type { QueryArgs } from "../types/utils";
import { handleError, ItemNotFoundError } from "./errors.utils";

export async function getItem<T>(key: { PK: string; SK: string }): Promise<T> {
  const item = await TransactTable.get(key);

  if (!item) {
    throw new ItemNotFoundError(key);
  }

  return item as T;
}

export async function putItem<T extends Record<string, any>>(
  key: { PK: string; SK: string },
  item: T,
): Promise<void> {
  try {
    await TransactTable.create({
      ...key,
      ...item,
    });
  } catch (err) {
    handleError(err);
    throw err;
  }
}

export async function runTransaction(actions: any[]) {
  try {
    return dynamoose.transaction(actions);
  } catch (err) {
    handleError(err);
    throw err;
  }
}

export async function queryItems<T>(args: QueryArgs): Promise<T[]> {
  try {
    let query = TransactTable.query(args.PK.name).eq(args.PK.value);

    if (args.indexName) {
      query = query.using(args.indexName);
    }

    if (args.SK?.beginsWith) {
      query = query.where(args.SK.name).beginsWith(args.SK.beginsWith);
    }

    if (args.SK?.equals) {
      query = query.where(args.SK.name).eq(args.SK.equals);
    }

    if (args.limit) {
      query = query.limit(args.limit);
    }
    const result = await query.exec();
    return result as unknown as T[];
  } catch (err) {
    handleError(err);
    throw err;
  }
}
