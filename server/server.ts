import express from "express";
import WebSocket from "ws";
import http from "http";

const server = http.createServer();

const app = express();
const wss = new WebSocket.Server({ server });

app.get("/", async function(req, res) {
    res.send(200);
});

server.on("request", app);

server.listen(6969, "0.0.0.0");