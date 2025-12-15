export class DbError extends Error {
  constructor(
    message: string,
    public code?: string,
    public cause?: unknown,
  ) {
    super(message);
  }
}

export class ItemNotFoundError extends DbError {
  constructor(args: unknown) {
    super("Item not found", "ItemNotFound", args);
  }
}

export const handleError = (err: any): never => {
  if (err?.name === "ConditionalCheckFailedException") {
    throw new DbError("Conditional check failed", err.name, err);
  }

  throw new DbError("DynamoDB error", err?.name, err);
};
