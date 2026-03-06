import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";

interface Props {
  name: string | null;
  open: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

const DeleteDialog = ({
  name,
  open,
  isDeleting = false,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open && !isDeleting) {
          onClose();
        }
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete item</DialogTitle>

          <DialogContent>
            {name && (
              <>
                Are you sure you want to delete <strong>{name}</strong>? This
                action cannot be undone.
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Button
              appearance="secondary"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              appearance="primary"
              onClick={onConfirm}
              disabled={isDeleting}
              style={{ background: "#d13438" }}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DeleteDialog;
