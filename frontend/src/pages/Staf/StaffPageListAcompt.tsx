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
  FilterFn,
  ColumnFiltersState,
  SortingFn,
  sortingFns,
} from "@tanstack/react-table";
import { Acompte } from "../../interfaces/AcompteInterface";
import { format } from "date-fns";
import AppPagination from "../../components/AppPagination";
import { useAuth } from "../../hooks/useAuth";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { getFilteredRowModel } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// function pour trier la liste des acomptes
const fuzzySort: SortingFn<Acompte> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId].itemRank,
      rowB.columnFiltersMeta[columnId].itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const StaffPageListAcompt: React.FC = () => {
  const { setLoading } = useLoading();
  const [listeAcompte, setListAcompte] = useState<Acompte[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 5,
    pageCount: 0,
  });
  const { isAuthenticated } = useAuth();

  const annee = Number(searchParams.get("annee")) || new Date().getFullYear();
  const mois = Number(searchParams.get("mois")) || new Date().getMonth() + 1;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columnHelper = createColumnHelper<Acompte>();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("reservation.reference", {
        header: () => "Reference de la réservation",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("reservation.nomOrganisation", {
        header: () => "Nom du client",
        cell: (info) => <div>{info.getValue()}</div>,
        filterFn: "includesString",
      }),
      columnHelper.accessor("datePrevue", {
        header: () => "Date prévue de paiement",
        cell: (info) => (
          <div>{format(new Date(info.getValue()), "dd/MM/yyyy")}</div>
        ),
        sortingFn: fuzzySort,
        enableColumnFilter: false,
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
                  : "text-blue-500 bg-blue-100"
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
        enableColumnFilter: false,
      }),
      columnHelper.accessor("montant", {
        header: () => "Montant",
        cell: (info) => <div>{info.getValue()}</div>,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("id", {
        header: () => "Actions",
        cell: (info) => {
          const { id, statut } = info.row.original;

          const isPaid = statut === "PAYE";
          const isPending = statut === "EN_ATTENTE";
          const linkTo = isPaid
            ? `/staf/acomptes/details/${id}`
            : `/staf/acomptes/payer/${id}`;
          const buttonText = isPending ? "Payer" : "Consulter";
          const buttonColor = isPending
            ? "bg-slate-800 hover:bg-slate-700"
            : "bg-blue-500 hover:bg-blue-700";

          return (
            <Link
              to={linkTo}
              className={`text-white font-bold py-2 px-4 rounded ${buttonColor}`}
            >
              {buttonText}
            </Link>
          );
        },
        enableColumnFilter: false,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: listeAcompte || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: "fuzzy",
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
    },
    // debugTable: true,
    // debugHeaders: true,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (!isAuthenticated) {
      return;
    }
    try {
      const { status, data } = await AcompteService.getAll({
        annee,
        mois,
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
  }, [annee, mois, page, pageSize, setLoading, isAuthenticated]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData, annee, mois]);

  const handleRowsPerPageChange = useCallback(
    async (newPageSize: number) => {
      setPagination({
        page: 1,
        pageSize: newPageSize,
        pageCount: pagination.pageCount,
      });
      updateSearchParams(1, newPageSize);
    },
    [pagination.pageCount, updateSearchParams]
  );

  const handlePageChange = useCallback(
    async (newPage: number) => {
      setPagination((prev) => ({ ...prev, page: newPage }));
      updateSearchParams(newPage, pageSize);
    },
    [pageSize, updateSearchParams]
  );

  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center gap-4 overflow-auto">
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
