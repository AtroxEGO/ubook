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
import {
  useCreateServiceMutation,
  useGetAllSubcategoriesQuery,
} from "../services/api/apiSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TimePicker } from "@mui/x-date-pickers";
import { MuiFileInput } from "mui-file-input";
import moment from "moment";
import { serviceCreationSchema } from "../utils/validationSchemas";

const ServiceForm = (initialValues) => {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const { data, isLoading: subcategoriesLoading } =
    useGetAllSubcategoriesQuery();

  const form = useFormik({
    initialValues: {
      name: "Test123123123",
      description: "Test123123123123",
      subcategory: "1",
      image: null,
      price: "12.99",
      duration: "31",
      gap: "11",
      serviceHourStart: "11:13",
      serviceHourEnd: "12:12",
    },
    validationSchema: serviceCreationSchema,
    onSubmit: (values) => {
      console.log(values);
      createService(values)
        .unwrap()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Box
      maxWidth="sm"
      width="100%"
      component="form"
      noValidate
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
          name="subcategory"
          loading={isLoading}
          value={form.values.subcategory}
          onChange={(event, newValue) =>
            form.setFieldValue("subcategory", newValue?.id)
          }
          onBlur={form.handleBlur}
          options={data?.map((elem) => elem.id) || []}
          groupBy={(option) => data?.[option]?.category_name}
          getOptionLabel={(option) => data?.[option]?.subcategory_name}
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
          name="duration"
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
          value={form.values.duration}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.duration && Boolean(form.errors.duration)}
          helperText={form.touched.duration && form.errors.duration}
        />
        <TextField
          id="price"
          name="price"
          label="Price (zł)"
          type="number"
          inputProps={{
            step: ".01",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          value={form.values.price}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.price && Boolean(form.errors.price)}
          helperText={form.touched.price && form.errors.price}
        />
        <TextField
          id="gap"
          name="gap"
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
          value={form.values.gap}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.gap && Boolean(form.errors.gap)}
          helperText={form.touched.gap && form.errors.gap}
        />
      </Box>
      <Box
        display="flex"
        gap={1}>
        <TimePicker
          id="serviceHourStart"
          name="serviceHourStart"
          sx={{ width: "50%" }}
          label="Start Hour"
          value={moment(form.values.serviceHourStart)}
          onChange={(value) =>
            form.setFieldValue("serviceHourStart", value.format("HH:mm"))
          }
          onBlur={form.handleBlur}
          error={
            form.touched.serviceHourStart &&
            Boolean(form.errors.serviceHourStart)
          }
          slotProps={{
            textField: {
              helperText:
                form.touched.serviceHourStart && form.errors.serviceHourStart,
            },
          }}
        />
        <TimePicker
          id="serviceHourEnd"
          name="serviceHourEnd"
          sx={{ width: "50%" }}
          label="End Hour"
          value={moment(form.values.serviceHourEnd)}
          onChange={(value) =>
            form.setFieldValue("serviceHourEnd", value.format("HH:mm"))
          }
          onBlur={form.handleBlur}
          error={
            form.touched.serviceHourEnd && Boolean(form.errors.serviceHourEnd)
          }
          helperText={form.touched.serviceHourEnd && form.errors.serviceHourEnd}
        />
      </Box>
      <MuiFileInput
        id="image"
        name="image"
        inputProps={{ accept: ".png, .jpeg" }}
        value={form.values.image}
        onChange={(value) => form.setFieldValue("image", value)}
        onBlur={form.handleBlur}
        error={form.touched.image && Boolean(form.errors.image)}
        helperText={form.touched.image && form.errors.image}
      />
      <LoadingButton
        type="submit"
        loading={isLoading}
        variant="contained">
        submit
      </LoadingButton>
    </Box>
  );
};

export default ServiceForm;
