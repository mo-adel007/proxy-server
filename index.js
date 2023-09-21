const http = require("http");
const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const port = process.env.PORT || 3000;

// Create a proxy server
const proxy = httpProxy.createProxyServer();

// Proxy middleware
app.use("/api", (req, res) => {
  // Define the target URL where the API requests should be forwarded
  const targetUrl = "http://api.example.com"; // Replace with your API server's URL

  // Forward the request to the target URL
  proxy.web(req, res, { target: targetUrl });
});

// Error handling for the proxy server
proxy.on("error", (err, req, res) => {
  console.error("Proxy Error:", err);
  res.status(500).json({ error: "Proxy Server Error" });
});

// Start the proxy server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
