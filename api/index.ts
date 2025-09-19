import { yoga } from "../src/graphql/yoga";
import app from "../src/rest/app";

app.use("/graphql", yoga);
export default app;
