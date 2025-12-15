import { CreateUserController } from "#apps/user/controllers";

export const handler = async (event: any) =>
  new CreateUserController().process(event);
