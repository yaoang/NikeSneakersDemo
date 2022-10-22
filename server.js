const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === "production";
const app = next({ dev });
const handle = app.getRequestHandler();
// const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('./server.config.json');
// const { networkInterfaces } = require('os');
// console.log(JSON.stringify(nets))

process.env.DATABASE_URL = `mysql://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.dbname}`

app.prepare().then(() => {
  const server = express();
  // server.use('/seed', createProxyMiddleware({ target: 'https://picsum.photos', changeOrigin: true }));

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;

    //   const nets = networkInterfaces()
    //   let address = ''
    //   for (const name of Object.keys(nets)) {
    //     for (const net of nets[name]) {
    //         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    //         if (net.family === familyV4Value && !net.internal) {
    //             // console.log(net)
    //             address = net.address
    //             break
    //         }
    //     }
    //     if (address) {
    //       break
    //     }
    // }
    // console.log(`> Ready on http://${address}:${port}`);

    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
      console.log(`> Ready on http://${add}:${port}`);
    })

  });
});