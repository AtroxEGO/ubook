import * as React from "react";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteServiceMutation } from "../../services/api/apiSlice";
import { setSnack } from "../../services/store/features/snackSlice";
import { useDispatch } from "react-redux";

export const DeleteServiceButton = ({ serviceID }) => {
  const dispatch = useDispatch();
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const handleClick = () => {
    console.log(serviceID);
    deleteService({ serviceID: serviceID })
      .unwrap()
      .then((data) => {
        dispatch(setSnack(data));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnack(error));
      });
  };

  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="delete the service"
        onClick={handleClick}>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          <DeleteIcon color="primary" />
        )}
      </IconButton>
    </Tooltip>
  );
};
