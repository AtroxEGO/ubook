import * as React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CheckServiceButton = ({ serviceID }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Check">
      <IconButton
        aria-label="check the service"
        sx={{
          marginLeft: "auto",
        }}
        onClick={() => {
          navigate("/service", {
            state: {
              serviceID: serviceID,
            },
          });
        }}>
        <ArrowForwardIosRoundedIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};
