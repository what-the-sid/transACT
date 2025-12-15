import dynamoose from "dynamoose";
import { TransactTable } from "#db";
import { queryUtils } from "#db/utils";
import type { WalletRecord } from "#apps/wallet/types/wallet";

export async function applyWalletTransaction(args: {
  userId: string;
  amount: number;
  type: "credit" | "debit";
  idempotencyKey: string;
}) {
  const { userId, amount, type, idempotencyKey } = args;

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  const signedAmount = type === "credit" ? amount : -amount;
  const now = new Date().toISOString();

  const condition =
    type === "debit"
      ? new dynamoose.Condition().where("balance").ge(amount)
      : undefined;

  await queryUtils.runTransaction([
    TransactTable.transaction.update(
      { PK: `USER#${userId}`, SK: "WALLET" },
      {
        $ADD: { balance: signedAmount },
        $SET: { updatedAt: now },
      },
      condition ? { condition } : undefined,
    ),
    TransactTable.transaction.create(
      {
        PK: `USER#${userId}`,
        SK: `TX#${idempotencyKey}`,
        type,
        amount,
        createdAt: now,
      },
      {
        condition: new dynamoose.Condition().attribute("PK").not().exists(),
      },
    ),
  ]);
}

export async function getWalletBalance(userId: string): Promise<number> {
  const items = await queryUtils.queryItems<WalletRecord>({
    PK: {
      name: "PK",
      value: `USER#${userId}`,
    },
    SK: {
      name: "SK",
      equals: "WALLET",
    },
    limit: 1,
  });

  return items.length ? (items[0].balance ?? 0) : 0;
}
