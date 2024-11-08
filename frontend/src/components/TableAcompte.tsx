import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Acompte } from "../interfaces/AcompteInterface";

interface TableAcompteProps {
  table: Table<Acompte>;
}

const TableAcompte: React.FC<TableAcompteProps> = ({ table }) => {
  return (
    <div className="flex flex-col p-10 items-center justify-center bg-slate-50 w-full overflow-auto">
      {/* Affichage de la table avec les entêtes et les données */}
      {table.getRowModel().rows.length > 0 ? (
        <table className="min-w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left bg-slate-100 px-4 py-2 text-slate-800"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-b py-2 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun acompte disponible</p>
      )}
    </div>
  );
};

export default TableAcompte;
