import React, {
  useLayoutEffect,
  useMemo,
  memo,
  useState,
  Fragment,
  useRef,
} from "react";
import {
  Button,
  Flex,
  Input,
  Icon,
  SimpleGrid,
  Checkbox,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import _ from "lodash";
import ReactExport from "react-export-excel";
import {
  FaFileExcel,
  FaFileCsv,
  FaTable,
  FaHandPointDown,
  FaHandPointer,
  FaHandPointUp,
} from "react-icons/fa";
import Modal from "components/atoms/Modal";

import "react-data-table-component-extensions/dist/index.css";
import { IoFilter, IoHandLeft } from "react-icons/io5";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(array[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
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
function downloadCSV(array) {
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

const Export = ({ onExport }) => (
  <Button
    size="sm"
    onClick={(e) => onExport(e.target.value)}
    colorScheme="gray"
    leftIcon={<Icon as={FaFileCsv} />}
  >
    Csv
  </Button>
);

function DataTableComp({
  columns,
  data,
  onClickRowEdit,
  excel,
  onClickFilter,
  filterData,
  resetFilterData,
}) {
  const [searchText, setSearchText] = useState("");
  const [colStat, setColStat] = useState([
    ...columns.map((column) => column.name),
  ]);
  const colModalRef = useRef(null);

  const seperators = columns.map((col) => col.selector);
  const filteredData = data.map((item) => {
    const itmObj = {};
    seperators.forEach((sep) => {
      itmObj[sep] = item[sep];
    });
    return itmObj;
  });

  function getSearchedData(data) {
    return data.filter((item) => {
      const d = _.values(item).some((value) => {
        if (
          `${!!value ? value : ""}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          return true;
        }
      });
      return !!d;
    });
  }

  useLayoutEffect(() => {
    const el = document.getElementsByClassName("sc-kLgntA gdMBZx gaMRwo");
    if (el) {
      const row = el[0];
      if (row) {
        row.textContent = "Bir sayfada gösterilecek satır";
      }
    }
  }, []);

  function onToggleCol(col) {
    if (colStat.includes(col.name)) {
      setColStat(colStat.filter((colName) => colName !== col.name));
    } else {
      setColStat((_cols) => [..._cols, col.name]);
    }
  }

  function hasCol(col) {
    return colStat.includes(col?.name);
  }

  function onFilterCols(col) {
    return hasCol(col);
  }

  const searchedData = useMemo(() => getSearchedData(data), [searchText, data]);

  const excelColumns = columns
    .filter((item) => !!item.selector)
    .map((item) => ({ label: item.name, value: item.selector }));

  class Download extends React.Component {
    render() {
      if (!!!excelColumns) {
        return null;
      }
      return (
        <ExcelFile
          element={
            <Button
              size="sm"
              ml="1"
              colorScheme="green"
              leftIcon={<Icon as={FaFileExcel} />}
            >
              Excel
            </Button>
          }
        >
          <ExcelSheet data={this.props.dataSet} name="Employees">
            {excelColumns.map((excelItem, excelIndex) => (
              <ExcelColumn
                label={excelItem.label}
                key={excelIndex}
                value={excelItem.value}
              />
            ))}
          </ExcelSheet>
        </ExcelFile>
      );
    }
  }

  const actionsMemo = React.useMemo(
    () => (
      <Flex w="100%" justifyContent="flex-end" alignItems="center">
        <Input
          type="text"
          size="sm"
          style={{ maxWidth: 200 }}
          mr="2"
          borderRadius="md"
          placeholder="Ara..."
          value={searchText}
          onChange={({ currentTarget: { value } }) => {
            setSearchText(value);
          }}
        />
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
        <Export onExport={() => downloadCSV(searchedData)} />
        {!!excelColumns && <Download dataSet={searchedData} />}
        {onClickRowEdit && (
          <Button size="sm" onClick={onClickRowEdit}>
            Kolon Ayarları
          </Button>
        )}
        {onClickFilter &&
          (filterData ? (
            <Button
              onClick={resetFilterData}
              outline
              color="danger"
              className="ml-1"
            >
              Filtre Sıfırla
            </Button>
          ) : (
            <Button
              onClick={onClickFilter}
              outline
              ml="1"
              size="sm"
              colorScheme="orange"
              leftIcon={<IoFilter />}
            >
              Filtre
            </Button>
          ))}
      </Flex>
    ),
    [searchText, filteredData]
  );

  return (
    <Fragment>
      <DataTable
        columns={columns.filter(onFilterCols)}
        data={searchedData}
        subHeaderComponent={actionsMemo}
        subHeader
        fixedHeader={true}
        defaultSortAsc={true}
        pagination
        highlightOnHover
        selectableRows
        selectableRowsHighlight
        selectableRowsNoSelectAll
        noContextMenu
        noHeader
        customStyles={{ table: { backgroundColor: "red" } }}
      />
      <Modal ref={colModalRef} noForm title="Kolon Ayarları">
        <SimpleGrid columns={[2]} spacing="1">
          {columns.map((col, index) => (
            <Checkbox
              defaultIsChecked={hasCol(col)}
              onChange={() => {
                onToggleCol(col);
              }}
            >
              {col.name}
            </Checkbox>
          ))}
        </SimpleGrid>
      </Modal>
    </Fragment>
  );
}

export default memo(DataTableComp);
