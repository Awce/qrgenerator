require("dotenv").config();
const express = require("express");
const QRCode = require("qrcode");
const bwipjs = require("bwip-js");

const app = express();
const port = process.env.PORT || 3000;

// Ruta para generar el código QR
app.get("/generate-qr", async (req, res) => {
  const url = req.query.url;
  const size = parseInt(req.query.size) || 150; // Tamaño predeterminado 150x150 px
  const color = req.query.color || "#000000"; // Color predeterminado negro
  const bgColor = req.query.bgColor || "#ffffff"; // Fondo predeterminado blanco

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    // Generar el código QR con tamaño personalizado (150x150 px)
    const qrCodeData = await QRCode.toDataURL(url, {
      width: size,
      color: {
        dark: color, // Color de los módulos
        light: bgColor, // Color de fondo
      },
    });

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

// Ruta para generar un código de barras
app.get("/generate-barcode", (req, res) => {
  const text = req.query.text || "123456789012"; // Valor predeterminado si no se proporciona el parámetro `text`
  const width = parseInt(req.query.width) || 2; // Ancho de las barras
  const height = parseInt(req.query.height) || 100; // Altura de las barras
  const format = req.query.format || "code128"; // Formato de código de barras predeterminado (Code 128)

  try {
    bwipjs.toBuffer(
      {
        bcid: format, // Tipo de código de barras (Code 128, EAN, UPC, etc.)
        text: text, // El texto que debe codificarse en el código de barras
        scale: width, // Ancho de las barras
        height: height, // Altura de las barras
        includetext: true, // Incluir el texto debajo del código de barras
        textxalign: "center", // Alinear el texto en el centro
      },
      function (err, png) {
        if (err) {
          return res.status(500).send("Error generating barcode");
        }

        // Establecer el tipo de contenido como imagen PNG
        res.setHeader("Content-Type", "image/png");
        res.send(png);
      }
    );
  } catch (err) {
    res.status(500).send("Error generating barcode");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
