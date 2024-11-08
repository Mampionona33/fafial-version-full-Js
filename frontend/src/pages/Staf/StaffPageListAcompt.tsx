import React, { useEffect, useState } from "react";
import HeaderStaffPagelistAcompt from "../../components/HeaderStaffPagelistAcompt";
import TableAcompte from "../../components/TableAcompte";
import { Link, useSearchParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { useLoading } from "../../hooks/useLoading";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Acompte } from "../../interfaces/AcompteInterface";
import { format } from "date-fns";
import AppPagination from "../../components/AppPagination";

const StaffPageListAcompt: React.FC = () => {
  const { setLoading } = useLoading();
  const [listeAcompte, setListAcompte] = useState<Acompte[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get("page")) || 1,
    pageSize: 5,
    pageCount: 0,
  });
  const annee = Number(searchParams.get("annee")) || new Date().getFullYear();
  const mois = Number(searchParams.get("mois")) || new Date().getMonth() + 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const page = Number(searchParams.get("page")) || 1;

  const columnHelper = createColumnHelper<Acompte>();

  const columns = [
    columnHelper.accessor("reservation.reference", {
      header: () => "Reference de la réservation",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("reservation.nomOrganisation", {
      header: () => "Nom du client",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("datePrevue", {
      header: () => "Date prévue de paiement",
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
                enRetard
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
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
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("id", {
      header: () => "Action",
      cell: (info) => {
        const value = info.getValue();
        const status = info.row.original.statut;
        return (
          <div>
            <Link
              to={`/staf/acompte/${value}`}
              className={`${
                status === "EN_ATTENTE"
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {status === "EN_ATTENTE" ? "Payer" : "Consulter"}
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
    manualPagination: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { status, data } = await AcompteService.getAll({
          annee: Number(annee),
          mois: Number(mois),
          page: page,
          pageSize: pageSize,
        });
        if (status === 200) {
          setListAcompte(data.acomptes);
          setPagination((prev) => ({
            ...prev,
            page: data.pagination.currentPage,
            pageSize: data.pagination.pageSize,
            pageCount: data.pagination.totalPages,
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [
    annee,
    mois,
    pagination.page,
    pagination.pageSize,
    setLoading,
    page,
    pageSize,
  ]);

  const handlePageChange = async (newPage: number) => {
    console.log("Page Change - page:", newPage, "pageSize:");

    setPagination((prev) => ({
      ...prev,
      page: newPage,
      pageSize: pageSize,
    }));

    // Manually trigger a re-fetch after updating the page state
    try {
      const { status, data } = await AcompteService.getAll({
        annee: Number(annee),
        mois: Number(mois),
        page: newPage,
        pageSize: pageSize,
      });
      if (status === 200) {
        setListAcompte(data.acomptes);
        setPagination({
          page: data.pagination.currentPage,
          pageSize: data.pagination.pageSize,
          pageCount: data.pagination.totalPages,
        });
        setSearchParams({
          page: String(newPage),
          annee: String(annee),
          mois: String(mois),
          pageSize: String(pageSize),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowsPerPageChange = async (newRowsPerPage: number) => {
    try {
      setPagination((prev) => ({
        ...prev,
        pageSize: newRowsPerPage,
      }));
      const { status, data } = await AcompteService.getAll({
        annee: Number(annee),
        mois: Number(mois),
        page: 1,
        pageSize: newRowsPerPage,
      });
      if (status === 200) {
        setListAcompte(data.acomptes);
        setPagination({
          page: data.pagination.currentPage,
          pageSize: data.pagination.pageSize,
          pageCount: data.pagination.totalPages,
        });
        setSearchParams({
          page: String(1),
          annee: String(annee),
          mois: String(mois),
          pageSize: String(newRowsPerPage),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center gap-4">
      <HeaderStaffPagelistAcompt />
      <TableAcompte table={table} />
      <AppPagination
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={pagination.pageSize}
      />
    </div>
  );
};

export default StaffPageListAcompt;
