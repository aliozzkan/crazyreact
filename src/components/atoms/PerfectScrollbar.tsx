import React, { PropsWithChildren } from "react";
import ReactPerfectScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

interface Props {
  maxHeight: number;
  innerRef?: any;
}

const PerfectScrollbar = (props: PropsWithChildren<Props>) => {
  return (
    <ReactPerfectScrollBar
      ref={props.innerRef}
      style={{ maxHeight: props.maxHeight }}
    >
      {props.children}
    </ReactPerfectScrollBar>
  );
};

export type { ScrollBarProps } from "react-perfect-scrollbar";

export default PerfectScrollbar;
