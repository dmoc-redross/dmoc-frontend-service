const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  //============================== stage server Start==================================

  res.set("X-Frame-Options", "SAMEORIGIN");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mlm.dmoc.com/"
  );
  res.setHeader("Access-Control-Allow-Origin", "https://stage-socket.d-moc.com/");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
  // res.setHeader(
  //   "Content-Security-Policy",
  //   "default-src 'self' ;frame-ancestors 'none';frame-src 'self' https://verify.walletconnect.com/ https://verify.walletconnect.org/; base-uri 'self' https://verify.walletconnect.com/ https://verify.walletconnect.org/; form-action 'none';style-src 'self' 'unsafe-inline';style-src-elem 'self' 'unsafe-inline' https://cdnjs.cloudflare.com/ https://fonts.googleapis.com/; connect-src 'self' wss://relay.walletconnect.com https://rpc.walletconnect.com/ https://stage-api.xbridge.tech/ https://sepolia.infura.io/ https://goerli.blockpi.network/ https://explorer-api.walletconnect.com/  https://verify.walletconnect.com https://endpoints.omniatech.io/ https://sepolia.etherscan.io/ https://goerli.etherscan.io/ https://testnet.bscscan.com/; img-src 'self' https://explorer-api.walletconnect.com/ data:; font-src 'self' https://cdnjs.cloudflare.com/ https://fonts.gstatic.com/;"
  // );

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1;mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  //============================== stage server end==================================

  next();
});
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
//
app.listen(3000); 
