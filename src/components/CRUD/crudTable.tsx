import React from "react";
import {
  IconButton,
  Box,
  Heading,
  Button,
  Flex,
  Spacer,
  useDisclosure,
  Text,
  Table,
} from "@chakra-ui/react";

import { Dialog, Portal } from "@chakra-ui/react";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";

// --- Interfaces ---
export interface DataItem {
  id: number;
  name: string;
  [key: string]: unknown;
}

export interface ColumnDef<T extends DataItem> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

export interface CrudTableProps<T extends DataItem> {
  title?: string;
  data: T[];
  columns: ColumnDef<T>[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

// --- CrudTable Component ---
const CrudTable: React.FC<CrudTableProps<DataItem>> = ({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onView,
}) => {
  const { open, onOpen, onClose } = useDisclosure();
  const [itemToDelete, setItemToDelete] = React.useState<DataItem | null>(null);

  const handleDeleteClick = (item: DataItem) => {
    setItemToDelete(item);
    onOpen();
  };

  const confirmDeleteAction = () => {
    if (itemToDelete && onDelete) {
      onDelete(itemToDelete);
      setItemToDelete(null);
    }
    onClose();
  };

  return (
    <Box p={4}>
      <Flex mb={4} align="center">
        {title && <Heading size="lg">{title}</Heading>}
        <Spacer />
        {onAdd && (
          <IconButton
            colorScheme="teal"
            onClick={onAdd}
            aria-label="Add item"
            variant="outline"
          >
            <FaPlus />
          </IconButton>
        )}
      </Flex>

      <Box overflowX="auto">
        <Table.Root variant="line" width="full">
          <Table.Header>
            <Table.Row>
              {columns.map((col) => (
                <Table.ColumnHeader
                  key={String(col.accessor)}
                  whiteSpace="nowrap"
                >
                  {col.header}
                </Table.ColumnHeader>
              ))}
              {(onEdit || onDelete || onView) && (
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={
                    columns.length + (onEdit || onDelete || onView ? 1 : 0)
                  }
                  textAlign="center"
                >
                  Aucune donnée à afficher.
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item) => (
                <Table.Row key={item.id}>
                  {columns.map((col) => (
                    <Table.Cell key={`${item.id}-${String(col.accessor)}`}>
                      {col.render
                        ? col.render(item)
                        : String(item[col.accessor])}
                    </Table.Cell>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <Table.Cell>
                      <Flex whiteSpace="nowrap">
                        {onView && (
                          <Button
                            size="sm"
                            variant="ghost"
                            mr={2}
                            onClick={() => onView && onView(item)}
                          >
                            Voir
                          </Button>
                        )}
                        {onEdit && (
                          <IconButton
                            colorScheme="teal"
                            onClick={() => onEdit && onEdit(item)}
                            aria-label="Edit item"
                            variant="outline"
                          >
                            <FaEdit />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            colorScheme="red"
                            onClick={() => handleDeleteClick(item)}
                            aria-label="Delete item"
                            variant="outline"
                          >
                            <FaTrash />
                          </IconButton>
                        )}
                      </Flex>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      <Dialog.Root
        open={open}
        onOpenChange={(openState) => {
          if (!openState) {
            onClose();
            setItemToDelete(null);
          }
        }}
        role="alertdialog"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Confirmer la suppression</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>
                  Êtes-vous sûr de vouloir supprimer cet élément ? Cette action
                  est irréversible.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline">Annuler</Button>
                </Dialog.CloseTrigger>
                <Button colorScheme="red" onClick={confirmDeleteAction} ml={3}>
                  Supprimer
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default CrudTable;
