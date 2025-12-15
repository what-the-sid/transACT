import { BalanceAmountController } from "#apps/wallet/controllers";

export const handler = async (event: any) =>
  new BalanceAmountController().process(event);
