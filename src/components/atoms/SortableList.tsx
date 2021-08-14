import React, { FC, Fragment, ReactElement } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  SortableContainer,
  SortableElement,
  WrappedComponent,
} from "react-sortable-hoc";
import arrayMove from "array-move";

interface SortableListProps {
  renderItem: (item: any) => ReactElement;
  data: any[];
  onChange: (newData: any[]) => void;
  keyExtractor: (item: any) => string;
}

const SortableComponet = (props: SortableListProps) => {
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    // this.setState(({ items }) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
    props.onChange(arrayMove(props.data, oldIndex, newIndex));
  };

  if(props.data.length === 0) return <Text>Veri bulunamadı!</Text>
  return <SortableList {...props} onSortEnd={onSortEnd}  />;
};

const SortableList: WrappedComponent<SortableListProps & any> = SortableContainer(
  (props: SortableListProps & {onSortEnd: any}) => {
    return (
      <Box maxH="300" minH="200px" overflowY="scroll" overflowX="hidden" >
        {props.data.map((item, index) => (
          <SortableItem index={index} key={props.keyExtractor(item)}>
            {props.renderItem(item)}
          </SortableItem>
        ))}
      </Box>
    );
  }
);

export default SortableComponet;

const SortableItem = SortableElement(({ children }: any) => (
  <Box cursor="grab" zIndex="modal">{children}</Box>
));
