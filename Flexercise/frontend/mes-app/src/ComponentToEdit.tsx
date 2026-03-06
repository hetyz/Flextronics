import { JSX, useEffect, useState } from "react";
import {
  PhoneRegular,
  TabletRegular,
  SmartwatchRegular,
  SurfaceEarbudsRegular,
  DeviceMeetingRoomRegular,
  EditRegular,
  MoreHorizontalRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Badge,
  TableCellActions,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import {
  Product,
  ProductStatus,
  getProductStatusColor,
  ProductType,
} from "./helper";
import { createApiClient } from "./api/client";
import ProductModal from "./components/modal/ProductModal";
import DeleteDialog from "./components/DeleteDialog";
import Header from "./components/layout/Header";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const api = createApiClient();

const columns = [
  { columnKey: "product", label: "Product" },
  { columnKey: "type", label: "Type" },
  { columnKey: "status", label: "Status" },
  { columnKey: "description", label: "Description" },
  { columnKey: "created", label: "Created" },
  { columnKey: "modifiedTime", label: "Modified Time" },
  { columnKey: "lastUpdated", label: "Last Updated" },
];

const getProductIcon = (productType: ProductType): JSX.Element => {
  switch (productType) {
    case ProductType.Phone:
      return <PhoneRegular />;
    case ProductType.Tablet:
      return <TabletRegular />;
    case ProductType.Watch:
      return <SmartwatchRegular />;
    case ProductType.Earbuds:
      return <SurfaceEarbudsRegular />;
    default:
      return <DeviceMeetingRoomRegular />;
  }
};

export const ComponentToEdit = (): JSXElement => {
  const [items, setItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    const data = await api.get<Product[]>("/product");
    setItems(data);
    setFilteredItems(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter((product) => {
      const name = product.name?.toLowerCase() ?? "";
      const description = product.description?.toLowerCase() ?? "";
      const type = ProductType[product.productType]?.toLowerCase() ?? "";
      const status = ProductStatus[product.status]?.toLowerCase() ?? "";

      return (
        name.includes(term) ||
        description.includes(term) ||
        type.includes(term) ||
        status.includes(term)
      );
    });

    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await api.delete(`/product/${deleteTarget.id}`);
      await fetchData();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setModalMode("create");
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalMode("edit");
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductModal
        open={modalMode !== null}
        mode={modalMode ?? "create"}
        product={selectedProduct}
        onClose={handleCloseModal}
        onSaved={fetchData}
      />

      <DeleteDialog
        name={deleteTarget?.name ?? null}
        open={deleteTarget !== null}
        isDeleting={isDeleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      <Header
        title="Products"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        actions={
          <Button appearance="primary" onClick={handleOpenCreate}>
            Create
          </Button>
        }
      />

      <Table aria-label="Products table" style={{ minWidth: "510px" }}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredItems.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <TableCellLayout>{product.name}</TableCellLayout>

                <TableCellActions>
                  <Button
                    icon={<EditRegular />}
                    appearance="subtle"
                    aria-label="Edit"
                    onClick={() => handleOpenEdit(product)}
                  />

                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <Button
                        icon={<MoreHorizontalRegular />}
                        appearance="subtle"
                        aria-label="More actions"
                      />
                    </MenuTrigger>

                    <MenuPopover>
                      <MenuList>
                        <MenuItem
                          icon={<DeleteRegular />}
                          onClick={() => setDeleteTarget(product)}
                          style={{ color: "#d13438" }}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </TableCellActions>
              </TableCell>

              <TableCell>
                <TableCellLayout media={getProductIcon(product.productType)}>
                  {ProductType[product.productType]}
                </TableCellLayout>
              </TableCell>

              <TableCell>
                <TableCellLayout>
                  <Badge
                    role="img"
                    title={ProductStatus[product.status]}
                    aria-label={ProductStatus[product.status]}
                    appearance="filled"
                    color={getProductStatusColor(product.status)}
                  />
                </TableCellLayout>
              </TableCell>

              <TableCell>
                <TableCellLayout>{product.description}</TableCellLayout>
              </TableCell>

              <TableCell>
                <TableCellLayout>
                  {timeAgo.format(new Date(product.created))}
                </TableCellLayout>
              </TableCell>

              <TableCell>
                <TableCellLayout>{getModifiedTime(product)}</TableCellLayout>
              </TableCell>

              <TableCell>
                <TableCellLayout>{product.lastUpdate}</TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

function getModifiedTime(product: Product): string {
  return product.modifiedTime && new Date(product.modifiedTime).getTime() !== 0
    ? timeAgo.format(new Date(product.modifiedTime))
    : "";
}
