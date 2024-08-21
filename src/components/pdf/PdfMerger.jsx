import { PDFDocument } from "pdf-lib";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PdfMerger() {
  const [files, setFiles] = useState([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const mergePdfs = async () => {
    const mergedPdf = await PDFDocument.create();
    const pdfsToMerge = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return PDFDocument.load(arrayBuffer);
      })
    );

    for (const pdfDoc of pdfsToMerge) {
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setMergedPdfUrl(url);
  };

  return (
    <div className="app-container">
      <h1 className="title">PDF Merger</h1>
      <input
        className="input-container"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button className="button-container" onClick={mergePdfs}>
        Merge PDFs
      </button>
      {mergedPdfUrl && (
        <div>
          <h2>Merged PDF</h2>
          <a href={mergedPdfUrl} download="merged.pdf">
            Download Merged PDF
          </a>
          <iframe
            src={mergedPdfUrl}
            width="100%"
            height="600px"
            title="Merged PDF"
          ></iframe>
        </div>
      )}
      <div className="instruction">
        <h5>1. Press the select file button</h5>
        <h5>2. Select multiple files you want to merge</h5>
        <h5>3. Press the merge PDFs button</h5>
        <h5>4. Press the download merged PDF button to download.</h5>
      </div>
    </div>
  );
}
