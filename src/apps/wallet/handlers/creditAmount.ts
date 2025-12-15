import { CreditAmountController } from "#apps/wallet/controllers";

export const handler = async (event: any) =>
  new CreditAmountController().process(event);
