import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiDownload, FiPrinter, FiEye } from "react-icons/fi";
import Button from "../ui/Button";
import Acknowledgement from "./Acknowledgement";
import { useT } from "../../i18n/LanguageContext";
import { nodeToPdf } from "../../lib/exporters";

/**
 * Print / Download acknowledgement buttons. Renders the acknowledgement twice:
 * a print-only copy (for window.print) and an off-screen copy that is
 * rasterised into the downloadable PDF.
 */
export default function AcknowledgementActions({ app, viewTo, printAck = true }) {
  const { t } = useT();
  const pdfRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const download = async () => {
    setDownloading(true);
    try {
      await nodeToPdf(pdfRef.current, `Acknowledgement-${app.applicationId}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="no-print flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {viewTo && (
          <Button to={viewTo} variant="secondary" size="lg" icon={FiEye}>
            {t("viewApplication")}
          </Button>
        )}
        <Button variant="secondary" size="lg" icon={FiPrinter} onClick={() => window.print()}>
          {printAck ? t("printAck") : t("print")}
        </Button>
        <Button size="lg" icon={FiDownload} loading={downloading} onClick={download}>
          {downloading ? t("preparing") : t("downloadAck")}
        </Button>
      </div>

      {/* Portalled to <body> so it prints even when placed inside a .no-print container. */}
      {createPortal(
        <>
          {printAck && (
            <div className="print-only">
              <Acknowledgement app={app} />
            </div>
          )}
          <div aria-hidden className="no-print pointer-events-none fixed left-[-10000px] top-0">
            <Acknowledgement ref={pdfRef} app={app} />
          </div>
        </>,
        document.body
      )}
    </>
  );
}
