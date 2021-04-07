require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const os = require("os");
const hostname = os.hostname();
const fs = require("fs");
const https = require("https");
const enforce = require("express-sslify");

const PORT = process.env.PORT | 80;
const HTTPS_ENABLE = process.env.HTTPS_ENABLE;
const HTTPS_KEY = process.env.HTTPS_KEY;
const HTTPS_CERT = process.env.HTTPS_CERT;
const PORT_HTTPS = process.env.PORT_HTTPS;

// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku). See further comments below
app.use(enforce.HTTPS());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (HTTPS_ENABLE === "true") {
    // we will pass our 'app' to 'https' server
    https
        .createServer(
            {
                key: fs.readFileSync(HTTPS_KEY),
                cert: fs.readFileSync(HTTPS_CERT)
            },
            app
        )
        .listen(PORT_HTTPS);
}

// Start the app by listening on the default
app.listen(PORT, () => {
    console.log(`Server listen on ${hostname}:${PORT}/`);
});
