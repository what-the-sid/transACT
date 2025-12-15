import { AuthorizeUserController } from "#apps/user/controllers";

export const handler = async (event: any) =>
  new AuthorizeUserController().process(event);
