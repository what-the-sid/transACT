export function buildUserKey(args: {
  userId: string;
  app: "profile" | "wallet" | "payment";
  id?: string;
}) {
  if (!args.userId) {
    throw new Error("userId is required");
  }

  let SK = args.app.toUpperCase();

  if (args.app === "payment" && args.id) {
    SK = `PAYMENT#${args.id}`;
  }

  return {
    PK: `USER#${args.userId}`,
    SK,
  };
}

export function buildEmailKey(email: string) {
  if (!email) {
    throw new Error("email is required");
  }

  return {
    PK: `EMAIL#${email.toLowerCase()}`,
    SK: "PROFILE",
  };
}
