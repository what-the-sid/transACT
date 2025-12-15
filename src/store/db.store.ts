import convict from "convict";

const dbStore = convict({
	table: {
		suffix: {
			doc: "DynamoDB table name prefix",
			format: String,
			default: "TransactTable",
			env: "TABLE_NAME",
		},
	},
});

export default dbStore;
