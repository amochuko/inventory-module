import { shutdownDatabase } from "./src/common/database/sqlConnection";

export default async () => {
    console.info('[Global teardown]: shutting down DB pool...\n')
    await shutdownDatabase();
}
