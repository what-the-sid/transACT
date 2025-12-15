import { ZodError, z } from "zod";
import { session } from "#apps/user/dao";
import { auth } from "#apps/user/helpers";

export class LoginUserController {
	private static readonly schema = z.object({
		email: z.email(),
		password: z.string().min(1),
	});

	async process(event: any) {
		try {
			const body = event?.body ? JSON.parse(event.body) : {};
			const { email, password } = LoginUserController.schema.parse(body);

			const user = await session.getUserByEmail(email);

			if (!user) {
				return this.unauthorized();
			}

			const passwordValid = auth.decrypt(password, user.password);

			if (!passwordValid) {
				return this.unauthorized();
			}

			const token = auth.signToken({ userId: user.userId });

			return {
				statusCode: 200,
				body: JSON.stringify({
					userId: user.userId,
					token: `Bearer ${token}`,
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
				message: "Invalid email or password",
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
