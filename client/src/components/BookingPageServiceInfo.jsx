import { Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import { RatingComponent } from "./ui/RatingComponent";

export const BookingPageServiceInfo = ({ serviceData }) => {
  return serviceData ? (
    <Box
      display="flex"
      padding={2}
      flexWrap="wrap"
      justifyContent="flex-start"
      alignContent="flex-start"
      gap={1}>
      <Box
        display="flex"
        gap={0.5}
        height="fit-content">
        <AccessTimeRoundedIcon color="primary" />
        <Typography variant="subtitle1">
          Duration: {serviceData?.duration} mins
        </Typography>
      </Box>
      <Box
        display="flex"
        gap={0.5}
        height="fit-content" // width="100%"
      >
        <AttachMoneyRoundedIcon color="primary" />
        <Typography variant="subtitle1">
          Price: {parseFloat(serviceData?.price).toFixed(2).replace(".", ",")}{" "}
          zł
        </Typography>
      </Box>
      <Box
        display="flex"
        gap={0.5}
        height="fit-content" // width="100%"
      >
        <StarBorderRoundedIcon color="primary" />
        <Typography variant="subtitle1">
          Rating: {serviceData?.averageReview} ({serviceData?.reviewCount}{" "}
          reviews)
        </Typography>
      </Box>
      <Box
        display="flex"
        gap={0.5}
        height="fit-content" // width="100%"
      >
        <PlaceIcon color="primary" />
        <Typography variant="subtitle1">
          Address: {serviceData?.address}
        </Typography>
      </Box>
      <RatingComponent serviceID={serviceData.serviceID} />
    </Box>
  ) : (
    <Box
      minHeight={"4em"}
      padding={2}>
      <Skeleton
        height={60}
        variant="rounded"
      />
    </Box>
  );
};
