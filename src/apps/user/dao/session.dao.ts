import { queryUtils } from "#db/utils";
import type { UserRecord } from "#apps/user/types/user";

export async function getUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  try {
    const emailItem = await queryUtils.getItem<{
      userId: string;
    }>({
      PK: `EMAIL#${email.toLowerCase()}`,
      SK: "PROFILE",
    });

    const user = await queryUtils.getItem<UserRecord>({
      PK: `USER#${emailItem.userId}`,
      SK: "PROFILE",
    });

    return user;
  } catch {
    return null;
  }
}
