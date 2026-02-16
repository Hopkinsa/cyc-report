// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  CYC_DIR: string;
}

// Choose how to access the environment variables.
// Remove the unused options.

// 1. Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
declare interface ImportMeta {
  readonly env: Env;
}
