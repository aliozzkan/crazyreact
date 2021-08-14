import React, { FC, memo } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { FaFileExcel } from "react-icons/fa";
import { ExcelColumn, ExcelFile, ExcelSheet } from "./ExcelFounds";

interface ExcelButtonProps {
  data: any;
}

const ExcelButton: FC<ExcelButtonProps> = (props) => {
  if(!!!props.data || props.data.length < 1) {
    return null;
  }
  return (
    <ExcelFile
      element={
        <Button size="sm" ml="1" colorScheme="green" leftIcon={<FaFileExcel />}>
          Excel
        </Button>
      }
    >
      <ExcelSheet data={props.data} name="Sheet">
        {Object.entries(props.data[0]).map(([label, value], excelIndex) => (
          <ExcelColumn label={label} key={excelIndex} value={label} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
};

ExcelButton.defaultProps = {};

export default memo(ExcelButton);
