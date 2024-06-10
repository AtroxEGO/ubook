import { LoadingButton } from "@mui/lab";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BottomFormInputs = ({ userFormik, setAccountType, isLoading }) => {
  const navigate = useNavigate();
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={userFormik.values.accountType}
        fullWidth
        onChange={(e) => {
          userFormik.handleChange(e);
          setAccountType(e.target.value);
        }}
        aria-label="Account Type">
        <ToggleButton
          name="accountType"
          value="user">
          User
        </ToggleButton>
        <ToggleButton
          name="accountType"
          value="business">
          Business
        </ToggleButton>
      </ToggleButtonGroup>
      <LoadingButton
        variant="contained"
        fullWidth
        loading={isLoading}
        type="submit">
        Submit
      </LoadingButton>
      <Typography ml="auto">
        Already have an account?
        <Button
          onClick={() => {
            navigate("/login", {
              state: { accountType: userFormik.values.accountType },
            });
          }}>
          Login
        </Button>
      </Typography>
    </>
  );
};
