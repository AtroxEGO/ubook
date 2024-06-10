import { Box, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useAddReviewMutation,
  useGetReviewByUserMutation,
  useRemoveReviewMutation,
} from "../../services/api/apiSlice";
import { useDispatch } from "react-redux";
import { setSnack } from "../../services/store/features/snackSlice";

export const RatingComponent = ({ serviceID }) => {
  const dispatch = useDispatch();
  const [reviewValue, setReviewValue] = useState(0);
  const [addReview] = useAddReviewMutation();
  const [getReviewByUser] = useGetReviewByUserMutation();
  const [removeReview] = useRemoveReviewMutation();

  useEffect(() => {
    getReviewByUser({ serviceID: serviceID })
      .unwrap()
      .then((data) => {
        console.log(data.review);
        setReviewValue(data.review);
      })
      .catch((error) => {
        dispatch(setSnack(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRatingChange = (newValue) => {
    setReviewValue(newValue);
    if (newValue === null) {
      removeReview({
        serviceID: serviceID,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    } else {
      addReview({
        serviceID: serviceID,
        review: newValue,
      })
        .unwrap()
        .then((data) => {
          dispatch(setSnack(data));
        })
        .catch((error) => {
          dispatch(setSnack(error));
        });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%">
      <Rating
        value={reviewValue}
        onChange={(_, newValue) => {
          handleRatingChange(newValue);
        }}
        name="ratingInput"
      />
    </Box>
  );
};
