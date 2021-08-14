import React, { FC, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Button,
  Icon,
  Select,
  IconButton,
  SimpleGrid,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import {
  Cell,
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { IoChevronBack, IoChevronForward, IoList } from "react-icons/io5";
import { GrAscend, GrDescend } from "react-icons/gr";
import Modal from "components/atoms/Modal";
import { FaFileCsv, FaFileExcel, FaTable } from "react-icons/fa";
import ExcelButton from "./ExcelButton";
import Moment from "moment";
import {matchSorter} from "match-sorter";

type ColumnType =
  | "number"
  | "date"
  | "string"
  | "isActiveBoolean"
  | "array"
  | "specialFunction"
  | "boolean"
  | "datetime";

interface OldColumn {
  name: string;
  selector?: string;
  sortable?: boolean;
  width?: string;
  cell?: (row: any) => any;
  columnType?: ColumnType;
  relationField?: string;
  specialData?: (cell: any) => string;
}

interface NewDataTableProps {
  data?: any[] | undefined;
  columns: OldColumn[];
  onClickFilter?: () => void;
}

const NewDataTable: FC<NewDataTableProps> = (props) => {
  const colModalRef = useRef<any>(null);

  const columns = React.useMemo(
    () =>
      props.columns.map((_column) => ({
        accessor: _column.selector || _column.name,
        renderer: _column.cell || undefined,
        Header: _column.name,
      })),
    [props.columns]
  ) as any;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    preGlobalFilteredRows,
    setGlobalFilter,
    ...allRest
  }: any = useTable(
    {
      columns,
      data: props.data || [],
      initialState: { pageIndex: 0 } as any,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  function generateExportCell(
    cellValue: any,
    columnType: ColumnType | undefined
  ) {
    if (!!!cellValue) {
      return "";
    }
    switch (columnType) {
      case "isActiveBoolean":
        return (cellValue as boolean) ? "Aktif" : "Pasif";
      case "boolean":
        return (cellValue as boolean) ? "Olumlu" : "Olumnsuz";
      case "date":
        return Moment(cellValue).format("DD.MM.YYYY");
      case "datetime":
        return Moment(cellValue).format("DD.MM.YYYY HH:mm");
      default:
        return `${cellValue}`;
    }
  }

  function getExcelData() {
    let tmpData: any[] = [];
    props.data?.forEach((item) => {
      let tmpItem: any = {};
      Object.entries(item).forEach(([key, value]) => {
        const _column = props.columns.find((_) => _.selector === key);
        if (_column) {
          tmpItem[_column.name] = !!_column.specialData
            ? _column.specialData(value)
            : !!_column.cell
            ? generateExportCell(value, _column.columnType)
            : !!value
            ? value
            : "";
        }
      });
      tmpData.push(tmpItem);
    });
    return tmpData;
  }

  useEffect(() => {
    setPageSize(10);
  }, []);

  function renderCell(cell: Cell) {
    if (!!(cell.column as any)?.renderer) {
      return (cell.column as any).renderer(cell.row.original);
    }
    return cell.render("Cell");
  }
  return (
    <Flex flexDir="column">
      <Flex mb="8" justifyContent="space-between" alignItems="center">
        <Flex>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Flex>
        <Flex>
          <Button
            size="sm"
            mr="1"
            colorScheme="blue"
            leftIcon={<Icon as={FaTable} />}
            onClick={() => {
              colModalRef.current?.open();
            }}
          >
            Kolonlar
          </Button>
          <Export onExport={() => downloadCSV(getExcelData())} />
          <ExcelButton data={getExcelData()} />
        </Flex>
      </Flex>
      <Box w="100%" overflowY="auto" overflowX="scroll">
        <Table
          {...getTableProps()}
          variant="simple"
          fontSize="xs"
          colorScheme="gray"
        >
          <Thead>
            {headerGroups.map((headerGroup: any) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <Th
                    px="10"
                    whiteSpace="nowrap"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Flex userSelect="none">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon color="gray.700" as={GrDescend} mr="1" />
                        ) : (
                          <Icon color="gray.700" as={GrAscend} mr="1" />
                        )
                      ) : (
                        ""
                      )}
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row: any, i: any) => {
                prepareRow(row);
                return (
                  <Tr
                    bgColor={row.isSelected ? "blue.100" : undefined}
                    {...row.getRowProps()}
                    key={i}
                  >
                    {row.cells.map((cell: any) => {
                      return (
                        <Td
                          px="10"
                          whiteSpace="nowrap"
                          {...cell.getCellProps()}
                        >
                          {renderCell(cell)}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={allColumns.length} p="5">
                  Veri bulunamadı!
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Box p="1" mt="2">
        <Text color="gray.700" fontSize="sm">
          Toplam {rows.length} adet veri
        </Text>
      </Box>
      <Flex justifyContent="space-between" alignItems="center" mt="5">
        <Flex alignItems="center">
          <Select
            size="xs"
            w="100px"
            defaultValue="10"
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </Select>
          <Text color="gray.600" mt="0.5" fontSize="xs" ml="3">
            Adet
          </Text>
        </Flex>
        <Flex alignItems="center">
          <IconButton
            disabled={!canPreviousPage}
            onClick={previousPage}
            aria-label="back-table"
            icon={<IoChevronBack />}
            size="xs"
            variant="ghost"
          />
          <Text fontSize="xs" mx="5">
            {state.pageIndex + 1} /{" "}
            <Text d="inline" color="gray.500">
              {pageCount}
            </Text>
          </Text>
          <IconButton
            disabled={!canNextPage}
            onClick={nextPage}
            aria-label="forward-table"
            icon={<IoChevronForward />}
            size="xs"
            variant="ghost"
          />
        </Flex>
      </Flex>
      <Modal ref={colModalRef} noForm title="Kolon Ayarları">
        <SimpleGrid columns={[2]} spacing="1" pb="10">
          {allColumns.map((column: any, index: any) => (
            <Checkbox
              key={index}
              {...column.getToggleHiddenProps()}
              defaultChecked={!state.hiddenColumns.includes(column.id)}
            >
              {column.Header}
            </Checkbox>
          ))}
        </SimpleGrid>
      </Modal>
    </Flex>
  );
};

NewDataTable.defaultProps = {
  columns: [],
  data: [],
};


// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array: any) {
  let result: any;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item: any) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function downloadCSV(array: any) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const Export = ({ onExport }: any) => (
  <Button
    size="sm"
    onClick={(e: any) => onExport(e.target.value)}
    colorScheme="gray"
    bgColor="gray.300"
    leftIcon={<Icon as={FaFileCsv} />}
  >
    Csv
  </Button>
);

const IndeterminateCheckbox = React.forwardRef<any, any>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox w="0px" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: any) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows: any[], id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <Input
        bgColor="gray.50"
        rounded="sm"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Ara...`}
      />
    </span>
  );
}

export default NewDataTable;

