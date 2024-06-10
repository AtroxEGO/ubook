import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import image from "../assets/placeholder.png";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { ServiceCardActions } from "./ui/ServiceCardActions";

export const ServiceCard = ({ service }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "24em",
        height: "100%",
        minWidth: "20em",
        marginInline: "0.5em",
        marginBlock: "0.5em",
      }}>
      <CardMedia
        component="img"
        height="170"
        image={service.image_url ? service.image_url : image}
        alt="service image"
      />
      <CardHeader
        avatar={
          <Tooltip title={service.creator_name}>
            <Avatar src={service.avatar_url} />
          </Tooltip>
        }
        title={service.name}
        subheader={service.subcategory_name}
        sx={{ pb: 0 }}
      />
      <CardContent
        sx={{
          height: "100%",
          maxHeight: "6em",
          overflow: "auto",
          paddingBlock: "0",
        }}>
        <List>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: "26px", mr: 0.5 }}>
              <Tooltip title="Duration">
                <AccessTimeRoundedIcon color="primary" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText>{service.duration}</ListItemText>
            <ListItemIcon sx={{ minWidth: "26px" }}>
              <Tooltip title="Price">
                <AttachMoneyRoundedIcon color="primary" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText>{service.price}zł</ListItemText>
            <ListItemIcon sx={{ minWidth: "26px" }}>
              <Tooltip title="Rating">
                <StarBorderRoundedIcon color="primary" />
              </Tooltip>
            </ListItemIcon>
            <ListItemText>
              <Box
                display="flex"
                gap="0.3em"
                alignItems="center">
                {service.averageReview}
                <Typography
                  fontSize="small"
                  color="text.secondary">
                  ({service.reviewCount})
                </Typography>
              </Box>
            </ListItemText>
          </ListItem>
        </List>
        <Typography
          variant="body2"
          style={{ display: "inline-block", whiteSpace: "pre-line" }}>
          {service.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ServiceCardActions serviceID={service.serviceID} />
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
