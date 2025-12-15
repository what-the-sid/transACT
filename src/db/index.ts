import dynamoose from "dynamoose";
import store from "#store";
import { MainSchema } from "./schema";

const region = store.app.get("region");
const nodenv = store.app.get("node_env");

export const transactTableName = `${store.db.get("table.suffix")}-${region}-${nodenv}`;

export const TransactTable = dynamoose.model(transactTableName, MainSchema, {
  create: false,
  waitForActive: false,
  throughput: "ON_DEMAND",
});
