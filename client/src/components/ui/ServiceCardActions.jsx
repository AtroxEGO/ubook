import * as React from "react";
import { CheckServiceButton } from "./CheckServiceButton";
import { FavoriteButton } from "./FavoriteButton";
import { useSelector } from "react-redux";
import { EditServiceButton } from "./EditServiceButton";
import { DeleteServiceButton } from "./DeleteServiceButton";

export const ServiceCardActions = ({ serviceID }) => {
  const accountType = useSelector(
    (state) => state.accountReducer.accountData.account
  );

  if (accountType === "user") {
    return (
      <>
        <FavoriteButton serviceID={serviceID} />
        <CheckServiceButton serviceID={serviceID} />
      </>
    );
  } else {
    return (
      <>
        <DeleteServiceButton serviceID={serviceID} />
        <EditServiceButton serviceID={serviceID} />
      </>
    );
  }
};
