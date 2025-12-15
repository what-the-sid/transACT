import convict from "convict";

const secretStore = convict({
  appSecret: {
    doc: "JWT secret for signing transact api tokens",
    format: String,
    default: "secretSanta",
    env: "APP_SECRET",
  },
  tokenExpiry: {
    doc: "JWT expiry for signing transact api tokens",
    format: Number,
    default: 60 * 60 * 24,
    env: "TOKEN_EXPIRY",
  },
  saltLength: {
    doc: "Length of salt for password hashing",
    format: Number,
    default: 16,
    env: "SALT_LENGTH",
  },
  keyLength: {
    doc: "Length of key for password hashing",
    format: Number,
    default: 128, //DO NOT CHANGE, WILL AFFECT PASSWORD VERIFICATION OF EXISITING USERS
    env: "KEY_LENGTH",
  },
});

export default secretStore;
