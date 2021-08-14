import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { FileIcon } from "react-file-icon";
import { IoTrash } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { isFileImage } from "helper/file-manager";
import { useToast } from "hooks/toast";

interface DropzoneProps {
  onDrop: (files: File[]) => void;
  multiple?: boolean;
  loading?: boolean;
  hasAllType?: boolean;
}

const Dropzone: FC<DropzoneProps> = (props) => {
  const [selectedFile, setSelectedFile] = useState<any>(
    props.multiple ? [] : undefined
  );
  const toast = useToast();

  function onDrop (acceptedFiles: File[]) {
    let appliedFiles: File[] = [];

    if (!props.hasAllType) {
      acceptedFiles.forEach((_file: File) => {
        if (isFileImage(_file)) {
          appliedFiles.push(_file);
        } else {
          toast({
            status: "warning",
            title: "Dosya Fotoğraf Değil!",
            description: `${_file.name} fotoğraf değil!`,
          });
        }
      });
    } else {
      appliedFiles.push(...acceptedFiles);
    }

    if (appliedFiles.length === 0) {
      return;
    }

    if (props.multiple) {
      setSelectedFile([...selectedFile, ...acceptedFiles]);
      props.onDrop([...selectedFile, ...acceptedFiles]);
    } else {
      setSelectedFile(appliedFiles[0]);
      props.onDrop(appliedFiles);
    }
  };



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: !!props.multiple,
  });

  return !!selectedFile ? (
    <Fragment>
      <Center
        borderWidth="thin"
        borderStyle="dashed"
        position="relative"
        p="0"
        alignItems="flex-start"
        borderRadius="md"
        mt="2"
        bgColor={isDragActive ? "blue.50" : undefined}
        w="100%"
        minH="100px"
        cursor="pointer"
        flexDir="column"
      >
        {props.loading && (
          <Center
            position="absolute"
            height="30px"
            width="30px"
            top="10px"
            left="10px"
          >
            <Spinner />
          </Center>
        )}
        {props.multiple ? (
          <Flex flexWrap="wrap" maxW="100%" overflow="hidden">
            {selectedFile &&
              Array.isArray(selectedFile) &&
              selectedFile.map((file, index) => (
                <Flex
                  position="relative"
                  key={`${file.name}-index`}
                  flexDirection="column"
                  minW="200px"
                  maxW="200px"
                  my="2"
                >
                  <Flex
                    flexDir="column"
                    textAlign="center"
                    alignItems="center"
                    fontSize="xs"
                  >
                    <Box w="35px">
                      <FileIcon extension={file.name.split(".").pop()} />
                    </Box>
                    <Text fontSize="xx-small">{file.name}</Text>
                    <Text color="gray.500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </Text>
                    <Button
                      size="xs"
                      leftIcon={<FaTrash />}
                      onClick={() =>
                        setSelectedFile(
                          selectedFile.filter((_, _index) => _index !== index)
                        )
                      }
                    >
                      Sil
                    </Button>
                  </Flex>
                </Flex>
              ))}
          </Flex>
        ) : (
          <>
            <IconButton
              aria-label="clearButton"
              icon={<IoTrash />}
              onClick={() => setSelectedFile(undefined)}
              size="sm"
              position="absolute"
              top="10px"
              right="10px"
            />
            <Flex
              flexDir="column"
              textAlign="center"
              alignItems="center"
              fontSize="xs"
            >
              <Box w="50px">
                <FileIcon extension={selectedFile.name.split(".").pop()} />
              </Box>
              <Text>{selectedFile.name}</Text>
              <Text color="gray.500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </Flex>
          </>
        )}
        <Center
          borderWidth="thin"
          borderStyle="dashed"
          p="6"
          alignItems="flex-start"
          borderRadius="md"
          bgColor={isDragActive ? "blue.50" : undefined}
          {...getRootProps()}
          w="100%"
          minH="100px"
          cursor="pointer"
          position="relative"
        >
          <VStack>
            <input type="hidden" {...getInputProps()} />
            <Text fontSize="xs" textAlign="center">
              {isDragActive ? (
                <p>Buraya bırakın!</p>
              ) : (
                <p>
                  {" "}
                  Yüklemek istediğiniz dosyayı buraya sürükleyin yada seçin!
                </p>
              )}
            </Text>
          </VStack>
        </Center>
      </Center>
      {!props.hasAllType && (
        <Text fontSize="xs" mt="0.5" color="red.300">
          Sadece fotoğraf yüklenebilir!
        </Text>
      )}
    </Fragment>
  ) : (
    <Fragment>
      <Center
        borderWidth="thin"
        borderStyle="dashed"
        p="6"
        alignItems="flex-start"
        borderRadius="md"
        mt="2"
        bgColor={isDragActive ? "blue.50" : undefined}
        {...getRootProps()}
        w="100%"
        minH="100px"
        cursor="pointer"
        position="relative"
      >
        <VStack>
          <input type="hidden" {...getInputProps()} />
          <Text fontSize="xs" textAlign="center">
            {isDragActive ? (
              <p>Buraya bırakın!</p>
            ) : (
              <p> Yüklemek istediğiniz dosyayı buraya sürükleyin yada seçin!</p>
            )}
          </Text>
        </VStack>
      </Center>
      {!props.hasAllType && (
        <Text fontSize="xs" mt="0.5" color="red.300">
          Sadece fotoğraf yüklenebilir!
        </Text>
      )}
    </Fragment>
  );
};

Dropzone.defaultProps = {};

export default Dropzone;
