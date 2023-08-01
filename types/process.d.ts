declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    DB_PORT: number;
  }
}