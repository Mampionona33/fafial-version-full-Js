import React, { useEffect, useState } from "react";
import HeaderStaffPagelistAcompt from "../../components/HeaderStaffPagelistAcompt";
import TableAcompte from "../../components/TableAcompte";
import { Link, useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { useLoading } from "../../hooks/useLoading";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Acompte } from "../../interfaces/AcompteInterface";
import { format } from "date-fns";

const StaffPageListAcompt: React.FC = () => {
  const { setLoading } = useLoading();
  const [listeAcompte, setListAcompte] = useState<Acompte[] | null>(null);
  const { annee, mois, page } = useParams();

  const columnHelper = createColumnHelper<Acompte>();

  const columns = [
    columnHelper.accessor("reservation.reference", {
      header: () => "Reference de la réservation",
      cell: (info) => {
        const value = info.getValue();
        return <div>{value}</div>;
      },
    }),
    columnHelper.accessor("reservation.nomOrganisation", {
      header: () => "Nom du client",
      cell: (info) => {
        const value = info.getValue();
        return <div>{value}</div>;
      },
    }),
    columnHelper.accessor("datePrevue", {
      header: () => "Date prevue de paiement",
      cell: (info) => {
        const value = format(new Date(info.getValue()), "dd/MM/yyyy");
        return <div>{value}</div>;
      },
    }),
    columnHelper.accessor("statut", {
      header: () => "Statut",
      cell: (info) => {
        const value = info.getValue();
        const datePrevue = info.row.original.datePrevue;
        const enRetard = new Date(datePrevue) < new Date();
        if (value === "EN_ATTENTE") {
          return (
            <div
              className={`${
                enRetard ? "text-red-500 bg-red-100" : "text-green-500"
              } text-center font-bold py-1 px-4 rounded-full`}
            >
              {enRetard ? "En retard" : "En cours"}
            </div>
          );
        }
        return <div>{value}</div>;
      },
    }),
    columnHelper.accessor("montant", {
      header: () => "Montant",
      cell: (info) => {
        const value = info.getValue();
        return <div>{value}</div>;
      },
    }),
    columnHelper.accessor("id", {
      header: () => "Action",
      cell: (info) => {
        const value = info.getValue();
        const status = info.row.original.statut;

        if (status === "EN_ATTENTE") {
          return (
            <div>
              <Link
                to={`/staf/acompte/${value}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Payer
              </Link>
            </div>
          );
        }
        return (
          <div>
            <Link
              to={`/staf/acompte/${value}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Consulter
            </Link>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: listeAcompte || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { status, data } = await AcompteService.getAll({
          annee: Number(annee),
          mois: Number(mois),
          page: Number(page),
        });
        if (status === 200) {
          setListAcompte(data.acomptes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [annee, mois, page, setLoading]);

  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center gap-4">
      <HeaderStaffPagelistAcompt />
      <TableAcompte table={table} />
    </div>
  );
};

export default StaffPageListAcompt;
