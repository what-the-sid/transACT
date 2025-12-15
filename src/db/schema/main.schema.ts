const MainSchema = {
  PK: {
    type: String,
    hashKey: true,
  },
  SK: {
    type: String,
    rangeKey: true,
  },

  userId: String,
  email: String,
  password: String,
  name: String,

  balance: Number,
  currency: String,

  paymentId: String,
  provider: String,
  direction: String,
  amount: Number,
  status: String,

  idempotencyKey: String,
  transactionId: String,

  createdAt: String,
  updatedAt: String,
};

export default MainSchema;
