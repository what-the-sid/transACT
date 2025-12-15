import type { UserRecord } from "#apps/user/types/user";

export function buildUserProfileItem(user: UserRecord) {
  return {
    PK: `USER#${user.userId}`,
    SK: "PROFILE",
    userId: user.userId,
    email: user.email,
    password: user.password,
    name: user.name,
    createdAt: user.createdAt,
  };
}

export function buildEmailLookupItem(user: UserRecord) {
  return {
    PK: `EMAIL#${user.email.toLowerCase()}`,
    SK: "PROFILE",
    userId: user.userId,
    createdAt: user.createdAt,
  };
}
