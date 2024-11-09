import React from "react";
import { Column, flexRender, Table } from "@tanstack/react-table";
import { Acompte } from "../interfaces/AcompteInterface";

interface TableAcompteProps {
  table: Table<Acompte>;
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter({ column }: { column: Column<Acompte, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded px-2 py-1"
    />
  );
}

const TableAcompte: React.FC<TableAcompteProps> = ({ table }) => {
  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-col p-10 items-center justify-center bg-slate-50 w-full overflow-auto">
      <table className="min-w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div className="flex items-start flex-col px-2">
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none text-left px-2 py-1"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-b py-2 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="text-center py-4"
              >
                Aucun résultat trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableAcompte;
