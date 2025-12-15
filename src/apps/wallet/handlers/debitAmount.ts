import { DebitAmountController } from "#apps/wallet/controllers";

export const handler = async (event: any) =>
  new DebitAmountController().process(event);
