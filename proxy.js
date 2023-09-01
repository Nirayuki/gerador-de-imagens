const http = require('http');
const https = require('https');

const hostname = 'localhost';
const port = 8080; // Porta local para o seu servidor proxy

const server = http.createServer((req, res) => {
  // Configurar a solicitação para a API do Pexels
  const options = {
    hostname: 'api.pexels.com',
    port: 443,
    path: req.url,
    method: req.method,
    headers: {
      'Authorization': 'vVkbJlFQZzcJc5HiqIwWxicbgnbYjsldUN6xN7NLRPnAlDW2eFCyPAtv', // Substitua pela sua chave de API real
    }
  };

  // Fazer a solicitação à API do Pexels
  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(port, hostname, () => {
  console.log(`Servidor proxy rodando em http://${hostname}:${port}/`);
});
