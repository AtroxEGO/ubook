import React from "react";
import {
  Box,
  Button,
  Container,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetAllSubcategoriesQuery } from "../services/api/apiSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TimePicker } from "@mui/x-date-pickers";

const ServiceForm = (initialValues) => {
  const { data, isLoading } = useGetAllSubcategoriesQuery();
  console.log(data);
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      location: "",
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box
      maxWidth="sm"
      width="100%"
      component="form"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={1}
      onSubmit={form.handleSubmit}>
      <Box
        display="flex"
        gap={1}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.name && Boolean(form.errors.name)}
          helperText={form.touched.name && form.errors.name}
        />
        <Autocomplete
          id="subcategory"
          options={data}
          groupBy={(option) => option?.category_name}
          getOptionLabel={(option) => option?.subcategory_name}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Subcategory"
            />
          )}
        />
      </Box>
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        multiline
        minRows={2}
        maxRows={3}
        value={form.values.description}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.touched.description && Boolean(form.errors.description)}
        helperText={form.touched.description && form.errors.description}
      />
      <Box
        display="flex"
        gap={1}>
        <TextField
          id="duration"
          label="Duration (minutes)"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="price"
          label="Price (zł)"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          id="gap"
          label="Gap (minutes)"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HourglassTopIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>
      <Box
        display="flex"
        gap={1}>
        <TimePicker
          sx={{ width: "50%" }}
          label="Start Hour"
        />
        <TimePicker
          sx={{ width: "50%" }}
          label="End Hour"
        />
      </Box>
      <Button
        variant="contained"
        component="label">
        Upload File
        <input
          type="file"
          hidden
        />
      </Button>
      <LoadingButton variant="contained">submit</LoadingButton>
    </Box>
  );
};

export default ServiceForm;
