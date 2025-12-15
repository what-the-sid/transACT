import { z, ZodError } from "zod";
import { transaction } from "#apps/wallet/dao";

export class DebitAmountController {
  private static readonly schema = z.object({
    amount: z.number().positive(),
    idempotencyKey: z.string().min(10),
  });

  async process(event: any) {
    try {
      const userId = event.requestContext.authorizer.lambda.userId;

      if (!userId) {
        return this.unauthorized();
      }
      const body = event?.body ? JSON.parse(event.body) : {};
      const data = DebitAmountController.schema.parse(body);

      await transaction.applyWalletTransaction({
        userId: userId,
        amount: data.amount,
        idempotencyKey: data.idempotencyKey,
        type: "debit",
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Wallet debited successfully",
          userId: userId,
          amount: data.amount,
        }),
      };
    } catch (err) {
      return this.handleError(err);
    }
  }

  private unauthorized() {
    return { statusCode: 401, body: "Unauthorized" };
  }

  private handleError(err: unknown) {
    if (err instanceof ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: err.issues }),
      };
    }

    if (err instanceof Error) {
      if (err.message.includes("InsufficientBalance")) {
        return {
          statusCode: 409,
          body: JSON.stringify({
            message: "Insufficient wallet balance",
          }),
        };
      }

      if (err.message.includes("Conditional")) {
        return {
          statusCode: 409,
          body: JSON.stringify({
            message: "Duplicate or invalid transaction",
          }),
        };
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
}
