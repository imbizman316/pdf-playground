import { PDFDocument } from "pdf-lib";
import React, { useState } from "react";

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
    <div>
      <h1>PDF Merger</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={mergePdfs}>Merge PDFs</button>
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
    </div>
  );
}
