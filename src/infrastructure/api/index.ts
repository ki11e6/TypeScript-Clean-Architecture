import express from "express";

import config from "./api.config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port ?? 3000}`);
});
// Handle errors
server.on("error", console.error);
