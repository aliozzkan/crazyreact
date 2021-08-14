import React, { Component } from "react";
import {IDataTableColumn} from 'react-data-table-component'

export interface Props {
  columns?: IDataTableColumn[];
  data?: any;
  pureDesign?: boolean;
  unUpdate?: boolean;
  onClickRowEdit?: any;
  onClickFilter?: any;
  filterData?: any;
  resetFilterData?: any;
  excel?: {
    label: string;
    value: any;
  }[];
}

declare const DataTable: React.SFC<Props>;

export default DataTable;
