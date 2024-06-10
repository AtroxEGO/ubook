import * as React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const EditServiceButton = ({ serviceID }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Edit">
      <IconButton
        aria-label="edit the service"
        sx={{
          marginLeft: "auto",
        }}
        onClick={() => {
          navigate("/updateService", {
            state: {
              serviceID: serviceID,
            },
          });
        }}>
        <EditIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};
