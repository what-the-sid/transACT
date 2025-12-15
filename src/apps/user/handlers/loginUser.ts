import { LoginUserController } from "#apps/user/controllers";

export const handler = async (event: any) =>
  new LoginUserController().process(event);
