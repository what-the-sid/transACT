import { ZodError } from "zod";
import { transaction } from "#apps/wallet/dao";

export class BalanceAmountController {
  async process(event: any) {
    try {
      const userId = event?.requestContext?.authorizer?.lambda?.userId;

      if (!userId) {
        return this.unauthorized();
      }

      const balance = await transaction.getWalletBalance(userId);

      return {
        statusCode: 200,
        body: JSON.stringify({
          userId,
          balance,
        }),
      };
    } catch (err) {
      return this.handleError(err);
    }
  }

  private unauthorized() {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Unauthorized",
      }),
    };
  }

  private handleError(err: unknown) {
    if (err instanceof ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: err.issues }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err instanceof Error ? err.message : "Internal Server Error",
      }),
    };
  }
}
