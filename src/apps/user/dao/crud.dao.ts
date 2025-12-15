import type { UserRecord } from "#apps/user/types/user";

import { marshall } from "@aws-sdk/util-dynamodb";

import { TransactTable } from "#db";
import { queryUtils } from "#db/utils";
import { dao } from "#apps/user/helpers";

export async function createUser(user: UserRecord) {
  const emailItem = dao.buildEmailLookupItem(user);
  const userItem = dao.buildUserProfileItem(user);

  try {
    await queryUtils.runTransaction([
      {
        Put: {
          TableName: TransactTable.name,
          Item: marshall(emailItem),
          ConditionExpression: "attribute_not_exists(PK)",
        },
      },
      {
        Put: {
          TableName: TransactTable.name,
          Item: marshall(userItem),
        },
      },
    ]);
  } catch (err: any) {
    if (err.name === "ConditionalCheckFailedException") {
      throw new Error("EmailAlreadyExists");
    }
    throw err;
  }
}
