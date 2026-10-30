import { useState } from "react";

function PracticalViewer({ subject, practicalNumber, onBack }) {
  const [loading, setLoading] = useState(true);
  const [currentPage] = useState(1);

  let pdfPath = "";

  if (subject === "AI") {
    pdfPath = "./pdf/ai/All%20AI%20Practicals.pdf";
  }

  if (subject === "CIS") {
    pdfPath = `./pdf/cis/Prac${practicalNumber}.pdf`;
  }

  const totalPages = subject === "AI" ? 20 : 9;

  const pdfUrl = pdfPath ? new URL(pdfPath, window.location.href).toString() : "";

  const title =
    subject === "AI"
      ? "AI Practical"
      : `CIS Practical ${practicalNumber}`;

  const iframeSrc = pdfUrl ? `${pdfUrl}#page=${currentPage}` : "";

  return (
    <div className="custom-pdf-viewer">
      <div className="pdf-toolbar">
        <button className="pdf-back" onClick={onBack}>
          ←
        </button>

        <div className="pdf-title">{title}</div>

        <div className="pdf-page-info">
          {currentPage} / {totalPages}
        </div>
      </div>

      <div className="pdf-workspace">
        <main className="pdf-main">
          {loading && <div className="pdf-loading">Loading PDF...</div>}

          <iframe
            className="pdf-iframe"
            src={iframeSrc}
            title={title}
            onLoad={() => setLoading(false)}
          />
        </main>
      </div>
    </div>
  );
}

export default PracticalViewer;