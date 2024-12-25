import React, { useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { FiDownload, FiSettings, FiRefreshCw } from "react-icons/fi";

function App() {
  const [inputText, setInputText] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [borderRadius, setBorderRadius] = useState(0);

  // Valider la taille
  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value) || 128;
    setSize(Math.max(128, Math.min(newSize, 512)));
  };

  // Fonction pour télécharger
  const downloadQRCode = () => {
    const svg = document.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const image = `data:image/svg+xml;base64,${btoa(source)}`;

    const link = document.createElement("a");
    link.href = image;
    link.download = "qrcode.png";
    link.click();
  };

  // Réinitialiser
  const resetSettings = () => {
    setInputText("");
    setColor("#000000");
    setBgColor("#ffffff");
    setSize(256);
    setBorderRadius(0);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ color: "#333", marginBottom: "20px", fontSize: "2.5rem" }}
      >
        🎉 Générateur de QR Code Ultime 🚀
      </motion.h1>

      {/* Conteneur principal */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* Paramètres */}
        <motion.div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            padding: "20px",
            width: "350px",
            textAlign: "left",
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ marginBottom: "15px" }}>
            <FiSettings /> Personnalisation
          </h3>
          <label>Texte :</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Entrez le texte ici"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />

          <label>Couleur :</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

          <label style={{ marginTop: "10px" }}>Couleur de fond :</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />

          <label style={{ marginTop: "10px" }}>Coins arrondis :</label>
          <input
            type="range"
            min="0"
            max="50"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            style={{ width: "100%" }}
          />

          <label style={{ marginTop: "10px" }}>Taille :</label>
          <input
            type="number"
            value={size}
            min="128"
            max="512"
            onChange={handleSizeChange}
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />

          {/* Boutons de tailles rapides */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => setSize(128)}
              style={{ marginRight: "5px", cursor: "pointer" }}
            >
              128x128
            </button>
            <button
              onClick={() => setSize(256)}
              style={{ marginRight: "5px", cursor: "pointer" }}
            >
              256x256
            </button>
            <button onClick={() => setSize(512)} style={{ cursor: "pointer" }}>
              512x512
            </button>
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: `${borderRadius}px`,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {inputText ? (
            <QRCode value={inputText} size={size} fgColor={color} bgColor={bgColor} />
          ) : (
            <p style={{ color: "#777" }}>❗ Entrez un texte pour voir le QR Code</p>
          )}
        </motion.div>
      </div>

      {/* Boutons globaux */}
      <div style={{ marginTop: "20px" }}>
        <motion.button
          onClick={resetSettings}
          whileHover={{ scale: 1.1 }}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          <FiRefreshCw /> Réinitialiser
        </motion.button>
        <motion.button
          onClick={downloadQRCode}
          whileHover={{ scale: 1.1 }}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FiDownload /> Télécharger
        </motion.button>
      </div>
    </div>
  );
}

export default App;
