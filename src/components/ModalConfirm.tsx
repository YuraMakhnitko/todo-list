import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { RiDeleteBinLine } from "react-icons/ri";

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: string) => void;
  onAction: () => void;
}

interface ModalConfirmProps {
  onAction: () => void;
}

const ConfirmationDialogRaw = (props: ConfirmationDialogRawProps) => {
  const { onClose, open, onAction, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onAction();
    onClose();
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          backgroundColor: "rgba(8, 80, 100, 0.95)",
        },
      }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle sx={{ color: "#fff;" }}>Delete this TODO?</DialogTitle>

      <DialogActions>
        <button autoFocus className="todo__button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="todo__button" onClick={handleOk}>
          Ok
        </button>
      </DialogActions>
    </Dialog>
  );
};

export const ModalConfirm: React.FC<ModalConfirmProps> = (
  props
): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const { onAction } = props;

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <List component="div" role="group">
        <button className="todo__button-delete" onClick={handleClickListItem}>
          <RiDeleteBinLine style={{ width: "25px", height: "25px" }} />
        </button>
        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          onAction={onAction}
        />
      </List>
    </Box>
  );
};
