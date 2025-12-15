import { auth } from "#apps/user/helpers";

export class AuthorizeUserController {
  async process(event: any) {
    try {
      const authHeader =
        event.headers?.authorization || event.headers?.Authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return this.unauthorized();
      }

      const token = authHeader.replace("Bearer ", "").trim();

      const payload = auth.verifyToken(token) as {
        userId: string;
      };

      if (!payload?.userId) {
        return this.unauthorized();
      }

      return {
        isAuthorized: true,
        context: {
          userId: payload.userId,
        },
      };
    } catch (error) {
      console.error(error);
      return this.unauthorized();
    }
  }

  private unauthorized() {
    return {
      isAuthorized: false,
    };
  }
}
