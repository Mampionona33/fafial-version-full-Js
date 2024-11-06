import React from "react";

interface TableAcompteProps {
  listeAcompte: [] | null;
}

const TableAcompte: React.FC<TableAcompteProps> = ({ listeAcompte }) => {
  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center bg-slate-50">
      <p>TableAcompte</p>
      {/* Rendu de listeAcompte */}
      {listeAcompte && listeAcompte.length > 0 ? (
        listeAcompte.map((acompte, index) => {
          console.log(acompte);
          return (
            <div key={index}>
              <p>acompte</p>
            </div>
          );
        })
      ) : (
        <p>Aucun acompte disponible</p>
      )}
    </div>
  );
};

export default TableAcompte;
