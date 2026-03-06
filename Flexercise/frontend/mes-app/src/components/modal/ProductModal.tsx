import { JSX, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";

import FluentSelectInput, { SelectOption } from "../input/FluentSelectInput";
import FluentTextInput from "../input/FluentTextInput";

import { createApiClient } from "../../api/client";
import { Product, ProductStatus, ProductType } from "../../helper";

import {
  DeviceMeetingRoomRegular,
  PhoneRegular,
  SmartwatchRegular,
  SurfaceEarbudsRegular,
  TabletRegular,
} from "@fluentui/react-icons";

interface Props {
  open: boolean;
  mode: "create" | "edit";
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}

type EnumLike = Record<string, string | number>;

function enumToOptions(e: EnumLike): SelectOption[] {
  return Object.keys(e)
    .filter((k) => isNaN(Number(k)))
    .map((k) => ({
      label: k,
      value: String(e[k]),
    }));
}

function getProductIcon(productType: ProductType): JSX.Element {
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
}

function enumToOptionsWithIcons(e: typeof ProductType): SelectOption[] {
  return Object.keys(e)
    .filter((k) => isNaN(Number(k)))
    .map((k) => {
      const v = e[k as keyof typeof e] as unknown as number;
      return {
        label: k,
        value: String(v),
        icon: getProductIcon(v as ProductType),
      };
    });
}

const ProductModal = ({ open, mode, product, onClose, onSaved }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [productType, setProductType] = useState("");

  const api = createApiClient();

  const statusOptions = useMemo(() => enumToOptions(ProductStatus), []);
  const typeOptions = useMemo(() => enumToOptionsWithIcons(ProductType), []);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && product) {
      setName(product.name ?? "");
      setDescription(product.description ?? "");
      setStatus(String(product.status));
      setProductType(String(product.productType));
      return;
    }

    setName("");
    setDescription("");
    setStatus("");
    setProductType("");
  }, [open, mode, product]);

  const saveProduct = async () => {
    const payload = {
      name,
      description,
      status: status === "" ? undefined : Number(status),
      productType: productType === "" ? undefined : Number(productType),
    };

    if (mode === "create") {
      await api.post("/product", payload);
    } else {
      if (!product) return;

      await api.put(`/product/${product.id}`, {
        id: product.id,
        ...payload,
      });
    }

    await onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => !data.open && onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {mode === "create" ? "Create product" : "Edit product"}
          </DialogTitle>

          <DialogContent style={{ display: "grid", gap: 16 }}>
            <FluentTextInput label="Name" value={name} onChange={setName} />

            <FluentSelectInput
              label="Type"
              value={productType}
              onChange={setProductType}
              options={typeOptions}
              placeholder="Select..."
            />

            <FluentSelectInput
              label="Status"
              value={status}
              onChange={setStatus}
              options={statusOptions}
              placeholder="Select..."
            />

            <FluentTextInput
              label="Description"
              value={description}
              onChange={setDescription}
            />
          </DialogContent>

          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={saveProduct}>
              {mode === "create" ? "Create" : "Save"}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ProductModal;
