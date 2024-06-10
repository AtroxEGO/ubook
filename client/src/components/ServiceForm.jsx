import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useCreateServiceMutation,
  useGetAllSubcategoriesQuery,
  useUpdateServiceMutation,
} from "../services/api/apiSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { TimePicker } from "@mui/x-date-pickers";
import { MuiFileInput } from "mui-file-input";
import moment from "moment";
import { serviceCreationSchema } from "../utils/validationSchemas";
import { useDispatch } from "react-redux";
import { setSnack } from "../services/store/features/snackSlice";
import { useNavigate } from "react-router-dom";

const ServiceForm = ({ serviceData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createService, { isLoading: isCreateServiceLoading }] =
    useCreateServiceMutation();
  const [updateService, { isLoading: isUpdateServiceLoading }] =
    useUpdateServiceMutation();
  const isLoading = isCreateServiceLoading || isUpdateServiceLoading;
  const { data, isLoading: subcategoriesLoading } =
    useGetAllSubcategoriesQuery();

  const form = useFormik({
    initialValues: {
      name: serviceData?.name || "",
      description: serviceData?.description || "",
      subcategory: null,
      image: null,
      price: serviceData?.price || "",
      duration: serviceData?.duration || "",
      gap: serviceData?.gap || "",
      serviceHourStart: "",
      serviceHourEnd: "",
    },
    validationSchema: serviceCreationSchema,
    onSubmit: (values) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        values.image = result;
        values.subcategory = values.subcategory.id;

        if (serviceData) {
          values.id = serviceData.serviceID;
          updateService(values)
            .unwrap()
            .then((data) => {
              dispatch(setSnack(data.response));
              navigate("/services");
            })
            .catch((error) => {
              dispatch(setSnack(error));
            });
        } else {
          createService(values)
            .unwrap()
            .then((data) => {
              dispatch(setSnack(data.response));
              navigate("/services");
            })
            .catch((error) => {
              console.log(error);
              dispatch(setSnack(error));
            });
        }
      };
      reader.onerror = () => {
        dispatch(
          setSnack({ message: "Error while uploading image", type: "error" })
        );
      };

      reader.readAsDataURL(values.image);
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
          loading={subcategoriesLoading}
          value={form.values.subcategory}
          onChange={(_, newValue) => {
            form.setFieldValue("subcategory", newValue);
          }}
          onBlur={form.handleBlur}
          options={data || []}
          groupBy={(option) => option.category_name}
          getOptionLabel={(option) => option.subcategory_name}
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
          onChange={(value) => {
            form.setFieldValue("serviceHourEnd", value.format("HH:mm"));
          }}
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
        onChange={(newFile) => {
          form.setFieldValue("image", newFile);
        }}
        onBlur={form.handleBlur}
        error={form.touched.image && Boolean(form.errors.image)}
        helperText={form.touched.image && form.errors.image}
      />
      <LoadingButton
        type="submit"
        onClick={() => console.log(form.values)}
        loading={isLoading}
        variant="contained">
        {serviceData ? "update" : "submit"}
      </LoadingButton>
    </Box>
  );
};

export default ServiceForm;
