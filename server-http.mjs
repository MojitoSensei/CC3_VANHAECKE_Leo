import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");

    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);

    response.setHeader("Content-Type", "text/plain");
    response.writeHead(500); // Définit le code d'erreur 500
    response.end("Erreur interne du serveur (500) : Le fichier index.html est introuvable.");
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Le serveur est en cours d'exécution sur http://${host}:${port}`);
});
