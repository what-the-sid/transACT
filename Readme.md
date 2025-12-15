# Transact API

A serverless API service to handle wallet transaction

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and deployment.

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v20.x recommended)
* [Yarn](https://yarnpkg.com/)
* [Serverless Framework](https://www.serverless.com/) (`npm install -g serverless`)
* **AWS CLI** configured with your credentials.

### 2. Environment Setup
You must configure your environment variables before running the application.

1.  Locate the `.env.dev` file in the root directory.
2.  Create a copy of it and name it `.env`:
    ```bash
    cp .env.dev .env
    ```
3.  Open `.env` and ensure all values are correct for your local setup.

> **Note:** The `.env` file is git-ignored and should contain your secrets. Never commit it to the repository.

### 3. Installation
Install the project dependencies:
```bash
yarn install
```

## 🛠️ Available Scripts

This project includes a `Makefile` for convenience, as well as standard `package.json` scripts.

### Using Make (Recommended)
We have a `Makefile` that handles environment variable exporting and cleaning automatically.

| Command | Description |
| :--- | :--- |
| **`make`** | Runs `clean` → `build` → `deploy` in one go. |
| **`make clean`** | Removes `dist` and `.serverless` directories. |
| **`make build`** | Compiles TypeScript code to `dist` and resolves aliases. |
| **`make deploy`** | Deploys the application to AWS using Serverless. |

### Standard NPM Scripts
You can also run the underlying scripts directly via Yarn:

* **`yarn dev`**
    * Starts the local development server using `nodemon` and `tsx`.
    * Watches for file changes in `src` and restarts automatically.
* **`yarn build`**
    * Compiles TypeScript using `tsc` and resolves path aliases with `tsc-alias`.
* **`yarn deploy`**
    * Runs `serverless deploy`. *Note: Ensure your environment variables are loaded if running this manually.*
* **`yarn lint`**
    * Checks code quality using [Biome](https://biomejs.dev/).
* **`yarn format`**
    * Formats code using Biome.

---

## 📦 Deployment

To deploy the API to AWS, simply run:

```bash
make deploy

## 📂 Project Structure

src
├── apps
│   ├── user
│   │   ├── controllers   # Business logic (Login, Create User)
│   │   ├── dao           # Database Access Objects (CRUD operations)
│   │   ├── handlers      # Lambda entry points (handler functions)
│   │   └── helpers       # User-specific utilities (Auth, JWT)
│   │
│   └── wallet
│       ├── controllers   # Wallet logic (Credit, Debit, Balance)
│       ├── dao           # Transaction data access
│       └── handlers      # Lambda entry points for Wallet API
│
├── db
│   ├── schema            # DynamoDB Schemas (MainSchema)
│   └── utils             # Query builders and DB helpers
│
├── middleware            # Shared middleware (Logger, Error handling)
│
└── store                 # Configuration stores (App config, Secrets)
