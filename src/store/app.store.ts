import convict from "convict";

const appStore = convict({
	node_env: {
		doc: "Runtime environment",
		format: ["dev", "test", "prod"],
		default: "dev",
		env: "NODE_ENV",
	},

	region: {
		doc: "AWS region",
		format: String,
		default: "us-east-1",
		env: "AWS_REGION",
	},
});

export default appStore;
