import { ZodError, z } from "zod";
import { crud } from "#apps/user/dao";
import { auth } from "#apps/user/helpers";

export class CreateUserController {
  private static readonly schema = z.object({
    email: z.email(),
    name: z.string().min(1),
    password: z.string().min(8),
  });

  async process(event: any) {
    try {
      const body = event?.body ? JSON.parse(event.body) : {};

      const data = CreateUserController.schema.parse(body);

      const user = {
        userId: crypto.randomUUID(),
        email: data.email,
        name: data.name,
        password: auth.encrypt(data.password),
        createdAt: new Date().toISOString(),
      };

      await crud.createUser(user);

      const { password, ...sanitizedUser } = user;

      return {
        statusCode: 201,
        body: JSON.stringify(sanitizedUser),
      };
    } catch (err) {
      return this.handleError(err);
    }
  }

  private handleError(err: unknown) {
    if (err instanceof ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: err.issues }),
      };
    }

    if (err instanceof Error && err.message === "EmailAlreadyExists") {
      return {
        statusCode: 409,
        body: JSON.stringify({
          message: "Email already registered",
        }),
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
