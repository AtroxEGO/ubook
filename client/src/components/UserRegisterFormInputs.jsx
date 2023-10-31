import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";

export const UserFormInputs = ({ userFormik }) => {
  return (
    <>
      <Box
        display="flex"
        gap={1}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={userFormik.values.firstName}
          onChange={userFormik.handleChange}
          onBlur={userFormik.handleBlur}
          error={
            userFormik.touched.firstName && Boolean(userFormik.errors.firstName)
          }
          helperText={
            userFormik.touched.firstName && userFormik.errors.firstName
          }
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={userFormik.values.lastName}
          onChange={userFormik.handleChange}
          onBlur={userFormik.handleBlur}
          error={
            userFormik.touched.lastName && Boolean(userFormik.errors.lastName)
          }
          helperText={userFormik.touched.lastName && userFormik.errors.lastName}
        />
      </Box>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={userFormik.values.email}
        onChange={userFormik.handleChange}
        onBlur={userFormik.handleBlur}
        error={userFormik.touched.email && Boolean(userFormik.errors.email)}
        helperText={userFormik.touched.email && userFormik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={userFormik.values.password}
        onChange={userFormik.handleChange}
        onBlur={userFormik.handleBlur}
        error={
          userFormik.touched.password && Boolean(userFormik.errors.password)
        }
        helperText={userFormik.touched.password && userFormik.errors.password}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="allowsMarketing"
            name="allowsMarketing"
            checked={userFormik.values.allowsMarketing}
            onChange={userFormik.handleChange}
            onBlur={userFormik.handleBlur}
          />
        }
        label="Allows marketing"
      />
    </>
  );
};
