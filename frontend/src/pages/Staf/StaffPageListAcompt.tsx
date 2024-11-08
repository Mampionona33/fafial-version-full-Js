import React, { useCallback, useEffect, useState } from "react";
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
    pageSize: Number(searchParams.get("pageSize")) || 5,
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
      cell: (info) => (
        <div>{format(new Date(info.getValue()), "dd/MM/yyyy")}</div>
      ),
    }),
    columnHelper.accessor("statut", {
      header: () => "Statut",
      cell: (info) => {
        const { statut, datePrevue } = info.row.original;
        const isLate = new Date(datePrevue) < new Date();
        return (
          <div
            className={`text-center font-bold py-1 px-4 rounded-full ${
              statut === "EN_ATTENTE"
                ? isLate
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
                : ""
            }`}
          >
            {statut === "EN_ATTENTE"
              ? isLate
                ? "En retard"
                : "En cours"
              : statut}
          </div>
        );
      },
    }),
    columnHelper.accessor("montant", {
      header: () => "Montant",
      cell: (info) => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor("id", {
      header: () => "Action",
      cell: (info) => {
        const { id, statut } = info.row.original;
        return (
          <Link
            to={`/staf/acompte/${id}`}
            className={`text-white font-bold py-2 px-4 rounded ${
              statut === "EN_ATTENTE"
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {statut === "EN_ATTENTE" ? "Payer" : "Consulter"}
          </Link>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: listeAcompte || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const updateSearchParams = useCallback(
    (page: number, pageSize: number) => {
      setSearchParams({
        page: String(page),
        annee: String(annee),
        mois: String(mois),
        pageSize: String(pageSize),
      });
    },
    [setSearchParams, annee, mois]
  );

  const fetchData = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      try {
        if (pageSize && page) {
          const { status, data } = await AcompteService.getAll({
            annee,
            mois,
            page,
            pageSize,
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
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [annee, mois, setLoading]
  );

  useEffect(() => {
    fetchData(pagination.page, pagination.pageSize);
  }, [fetchData, pagination.page, pagination.pageSize]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPagination((prev) => ({ ...prev, page: newPage }));
      updateSearchParams(newPage, pageSize);
      fetchData(newPage, pageSize);
    },
    [fetchData, pageSize, updateSearchParams]
  );

  const handleRowsPerPageChange = useCallback(
    (newPageSize: number) => {
      setPagination({
        page: 1,
        pageSize: newPageSize,
        pageCount: pagination.pageCount,
      });
      updateSearchParams(1, newPageSize);
      fetchData(page, newPageSize);
    },
    [fetchData, pagination.pageCount, updateSearchParams, page]
  );

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
