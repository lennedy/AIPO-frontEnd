/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

import Popup from "examples/Popup";

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  buttonEnable,
  handleAddUser,
  // Opcional: use isto no(s) lugar(es) em que você usava `key` para forçar atualização
  // sem desmontar o componente.
  dataVersion,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  
  // Se precisar recalcular quando algo externo mudar (antes você usava `key`),
  // use a prop `dataVersion` como dependência dos memos, em vez de forçar unmount.
  const columns = useMemo(() => table.columns, [table, dataVersion]);
  const data = useMemo(() => table.rows, [table, dataVersion]);

  // --- "paginationModel" equivalente (controlado + persistido) ---
  const persistenceId = useMemo(() => {
    // cria um id estável por conjunto de colunas (evita conflito entre tabelas diferentes)
    const sig =
      (table?.columns || [])
        .map((c) => c.accessor || c.Header)
        .join("|") || "default";
    return "dt:"+sig;
  }, [table]);

  // console.log("ave");
  // console.log(persistenceId);

  const [paginationModel, setPaginationModel] = useState(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(persistenceId) || "{}"
      );
      return {
        page: Number.isInteger(saved.page) ? saved.page : 0,
        pageSize: saved.pageSize || defaultValue || 10,
      };
    } catch {
      return { page: 0, pageSize: defaultValue || 10 };
    }
  });

  const tableInstance = useTable(
    {
      columns,
      data,
      //initialState: { pageIndex: 0 }
      // Começa do que estava salvo
      initialState: {
        pageIndex: 0,
        pageSize: paginationModel.pageSize,
      },
      // Não reseta página automaticamente quando data/ordenação muda
      autoResetPage: false, // ver docs do usePagination :contentReference[oaicite:2]{index=2}
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Garante pageSize inicial conforme entriesPerPage
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue, setPageSize]);

  // Atualiza pageSize pela UI
  const setEntriesPerPage = (value) => setPageSize(value);


  // Persiste mudanças de page/pageSize -> localStorage
  useEffect(() => {
    const model = { page: pageIndex, pageSize };
    setPaginationModel(model);
    console.log("trump");
    try {
      window.localStorage.setItem(persistenceId, JSON.stringify(model));
    } catch {}
  }, [pageIndex, pageSize, persistenceId]);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={"p-"+option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    if (pageIndex !== 0) gotoPage(0);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup, groupIdx) => (
            <TableRow
              key={headerGroup.id || groupIdx}
              {...headerGroup.getHeaderGroupProps?.()}
            >
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={column.id || idx}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                  hidden={column.hidden}
                >
                  {column.render("Header")}
                  {/* {column.hidden != true ? column.render("Header") : null} */}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {rows.length === 0 && buttonEnable == true ? (
            <TableRow>
              <DataTableBodyCell colSpan={columns.length} align="center">
                <MDBox py={3}>
                  <MDTypography variant="button" fontWeight="regular">
                    Nenhum resultado encontrado.
                  </MDTypography>
                  <MDBox mt={2}>
                    <Popup
                      message="procurar no SUAP"
                      label="Prouarar no SUAP"
                      handleAddUser={handleAddUser}
                    />
                  </MDBox>
                </MDBox>
              </DataTableBodyCell>
            </TableRow>
          ) : (
            page.map((row, rowIdx) => {
              prepareRow(row);
              return (
                <TableRow key={row.id || rowIdx} {...row.getRowProps?.()}>
                  {row.cells.map((cell, idx) => (
                    <DataTableBodyCell
                      key={""+(cell.column.id || idx)+"-"+(row.id || rowIdx)}
                      noBorder={noEndBorder && rows.length - 1 === (row.id || rowIdx)}
                      align={cell.column.align ? cell.column.align : "left"}
                      {...cell.getCellProps?.()}
                      hidden={cell.column.hidden}
                    >
                      {cell.render("Cell")}
                      {/* {cell.column.hidden != true ? cell.render("Cell") : null} */}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  buttonEnable: false,
  dataVersion: undefined,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  buttonEnable: PropTypes.bool,
  handleAddUser: PropTypes.func,
  // Use isto quando você *antes* colocava `key={...}` para forçar recálculo:
  // passe `dataVersion={...}` e nós só recalculamos os memos (sem unmount).
  dataVersion: PropTypes.any,
};

export default DataTable;
