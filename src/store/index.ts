import AppStore from "./app.store";
import DbStore from "./db.store";
import SecretStore from "./secrets.store";

AppStore.validate({ allowed: "strict" });
DbStore.validate({ allowed: "strict" });
SecretStore.validate({ allowed: "strict" });

const store = {
	app: AppStore,
	db: DbStore,
	secret: SecretStore,
};

export default store;
