import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import InvoiceService from "../../services/InvoiceService";
import { useState, useEffect } from "react";

const PageStaffFactureAcompte = () => {
  const { idAcompte } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const {
    data: factureBlob,
    isLoading: isLoadingFacture,
    isSuccess: isSuccessFacture,
  } = useQuery({
    queryKey: ["facture", idAcompte],
    queryFn: ({ queryKey }) =>
      InvoiceService.getAcompteInvoice(queryKey[1] as string),
  });

  useEffect(() => {
    if (isSuccessFacture && factureBlob) {
      const url = URL.createObjectURL(factureBlob.data);
      setPdfUrl(url);

      // Nettoyer l'URL lorsqu'on quitte la page
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [isSuccessFacture, factureBlob]);

  if (isLoadingFacture) return <p>Chargement de la facture...</p>;
  if (!pdfUrl) return <p>Aucune facture trouvée.</p>;

  return (
    <div>
      <h1>Facture Acompte</h1>
      <iframe
        src={pdfUrl}
        width="100%"
        height="800px"
        title="Facture Acompte PDF"
      />
    </div>
  );
};

export default PageStaffFactureAcompte;
