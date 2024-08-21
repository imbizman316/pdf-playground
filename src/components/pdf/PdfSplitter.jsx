import { PDFDocument } from "pdf-lib";
import React, { useState } from "react";

function PdfSplitter() {
  const [file, setFile] = useState(null);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [separatedPdfUrl, setSeparatedPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleStartPageChange = (event) => {
    setStartPage(parseInt(event.target.value));
  };

  const handleEndPageChange = (event) => {
    setEndPage(parseInt(event.target.value));
  };

  const separatedPdf = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPageCount = pdfDoc.getPageCount();
    const validStartPage = Math.max(1, Math.min(startPage, totalPageCount));
    const validEndPage = Math.max(1, Math.min(endPage, totalPageCount));
    const extractedPdfDoc = await PDFDocument.create();

    for (let i = validStartPage - 1; i < validEndPage; i++) {
      const [copiedPage] = await extractedPdfDoc.copyPages(pdfDoc, [i]);
      extractedPdfDoc.addPage(copiedPage);
    }

    const extractedPdfBytes = await extractedPdfDoc.save();
    const blob = new Blob([extractedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setSeparatedPdfUrl(url);
  };

  return (
    <div className="app-container">
      <h1 className="title">PDF Separator</h1>
      <input
        className="input-container"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <div className="page-select">
        <label>
          Start Page:
          <input
            type="number"
            value={startPage}
            onChange={handleStartPageChange}
            min="1"
          />
        </label>
        <label>
          End Page:
          <input
            type="number"
            value={endPage}
            onChange={handleEndPageChange}
            min="1"
          />
        </label>
      </div>
      <button className="button-container" onClick={separatedPdf}>
        Separate PDF
      </button>
      {separatedPdfUrl && (
        <div>
          <h2>Separated PDF</h2>
          <a href={separatedPdfUrl} download="separated.pdf">
            Download Separated PDF
          </a>
          <iframe
            src={separatedPdfUrl}
            width="100%"
            height="600px"
            title="Separated PDF"
          ></iframe>
        </div>
      )}
      <div className="instruction">
        <h5>1. Press the select file button</h5>
        <h5>2. Set start page and end page.</h5>
        <h5>3. Press the separate PDF button</h5>
        <h5>4. Press the download splitted PDF button to download.</h5>
      </div>
    </div>
  );
}

export default PdfSplitter;
