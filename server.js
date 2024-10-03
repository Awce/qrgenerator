require("dotenv").config();
const express = require("express");
const QRCode = require("qrcode");

const app = express();
const port = process.env.PORT || 3000;

// Ruta para generar el código QR
app.get("/generate", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    // Generar el código QR con tamaño personalizado (150x150 px)
    const qrCodeData = await QRCode.toDataURL(url, { width: 150 });

    // Establecer el tipo de contenido para que sea una imagen
    res.setHeader("Content-Type", "image/png");

    // Enviar el código QR como una imagen
    const imgData = qrCodeData.replace(/^data:image\/png;base64,/, "");
    const imgBuffer = Buffer.from(imgData, "base64");

    // Enviar la imagen en formato binario
    res.send(imgBuffer);
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
