import { PDFDocument, rgb } from "pdf-lib";
import React, { useState } from "react";
import { saveAs } from "file-saver";

function PdfConverter() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const convertToPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (file.type.startsWith("image/")) {
          const imageBytes = new Uint8Array(reader.result);
          let pdfImage;
          if (file.type === "image/jpeg" || file.type === "image/jpg") {
            pdfImage = await pdfDoc.embedJpg(imageBytes);
          } else if (file.type === "image/png") {
            pdfImage = await pdfDoc.embedPng(imageBytes);
          }
          const page = pdfDoc.addPage();
          const { width, height } = pdfImage.scale(1);
          page.drawImage(pdfImage, {
            x: 0,
            y: page.getHeight() - height,
            width,
            height,
          });
        } else if (file.type === "text/plain") {
          const text = new TextDecoder().decode(reader.result);
          const page = pdfDoc.addPage();
          page.drawText(text, {
            x: 50,
            y: page.getHeight() - 50,
            size: 12,
            color: rgb(0, 0, 0),
          });
        }

        if (files.indexOf(file) === files.length - 1) {
          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          saveAs(blob, "converted.pdf");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">PDF Converter</h1>
      <input
        className="input-container"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button className="button-container" onClick={convertToPdf}>
        Convert to PDF
      </button>
      {pdfUrl && (
        <div>
          <h2>Converted PDF</h2>
          <a href={pdfUrl} download="converted.pdf">
            Download PDF
          </a>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="Converted PDF"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default PdfConverter;
