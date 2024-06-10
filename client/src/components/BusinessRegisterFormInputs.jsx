import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import AddressAutocomplete from "mui-address-autocomplete";

export const BusinessRegisterFormInputs = ({ businessFormik }) => {
  return (
    <>
      <TextField
        fullWidth
        id="businessName"
        name="businessName"
        label="Business Name"
        value={businessFormik.values.businessName}
        onChange={businessFormik.handleChange}
        onBlur={businessFormik.handleBlur}
        error={
          businessFormik.touched.businessName &&
          Boolean(businessFormik.errors.businessName)
        }
        helperText={
          businessFormik.touched.businessName &&
          businessFormik.errors.businessName
        }
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={businessFormik.values.email}
        onChange={businessFormik.handleChange}
        onBlur={businessFormik.handleBlur}
        error={
          businessFormik.touched.email && Boolean(businessFormik.errors.email)
        }
        helperText={businessFormik.touched.email && businessFormik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={businessFormik.values.password}
        onChange={businessFormik.handleChange}
        onBlur={businessFormik.handleBlur}
        error={
          businessFormik.touched.password &&
          Boolean(businessFormik.errors.password)
        }
        helperText={
          businessFormik.touched.password && businessFormik.errors.password
        }
      />
      <AddressAutocomplete
        apiKey={""}
        label="Address"
        name="address"
        id="address"
        error={true}
        value={businessFormik.values.address}
        fields={["geometry"]} // fields will always contain address_components and formatted_address, no need to repeat them
        onChange={(_, value) => {
          businessFormik.setFieldValue("address", value?.formatted_address);
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="allowsMarketing"
            name="allowsMarketing"
            checked={businessFormik.values.allowsMarketing}
            onChange={businessFormik.handleChange}
            onBlur={businessFormik.handleBlur}
          />
        }
        label="Allows marketing"
      />
    </>
  );
};
