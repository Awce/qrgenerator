require("dotenv").config();
const express = require("express");
const QRCode = require("qrcode");

const app = express();
const port = process.env.PORT || 3000;

app.get("/generate", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const qrCodeData = await QRCode.toDataURL(url);
    res.send(`
            <h1>Bitwok | QR Code Generator</h1>
            <p>URL: ${url}</p>
            <img src="${qrCodeData}" />
        `);
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
