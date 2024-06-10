import { Box, Tabs, Typography } from "@mui/material";
import React, { useMemo } from "react";
import ServiceCard from "./ServiceCard";

export const ServiceList = ({ allServices, searchTerm }) => {
  const uniqueCategories = new Set();

  allServices?.forEach((item) => {
    if (item.category_name) {
      uniqueCategories.add(item.category_name);
    }
  });

  const distinctCategoryNames = Array.from(uniqueCategories);

  const filteredData = useMemo(() => {
    return allServices?.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.subcategory_name.toLowerCase().includes(searchTerm)
    );
  }, [allServices, searchTerm]);

  return (
    <>
      {distinctCategoryNames?.map((categoryName, index) => {
        return (
          <Box key={index}>
            <Typography
              mt={2}
              color="text.secondary"
              variant="h5">
              {categoryName}
            </Typography>
            <Tabs
              variant="scrollable"
              scrollButtons
              value={0}
              aria-label="scrollable categorized services">
              <ServiceRow
                filteredData={filteredData}
                categoryName={categoryName}
              />
            </Tabs>
          </Box>
        );
      })}
    </>
  );
};

// const ServiceRow = ({ filteredData, categoryName }) => {

//   return (
//     <>
//       {filteredData
//         .filter((service) => service.category_name === categoryName)
//         .map((service) => (
//           <ServiceCard
//             service={service}
//             key={service.serviceID}
//           />
//         ))}
//     </>
//   );
// };

const ServiceRow = React.memo(({ filteredData, categoryName }) => {
  return (
    <>
      {filteredData
        .filter((service) => service.category_name === categoryName)
        .map((service) => (
          <ServiceCard
            service={service}
            key={service.serviceID}
          />
        ))}
    </>
  );
});
