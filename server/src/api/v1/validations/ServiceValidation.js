const yup = require("yup");

const nameEmpty = "Please enter service name!";
const descEmpty = "Please enter service description!";
const wrongNameLength =
  "Service name musts be between 10 and 100 characters long!";
const wrongDescLength =
  "Description musts be between 10 and 500 characters long!";

const serviceCreationSchema = yup.object().shape({
  name: yup
    .string()
    .min(10, wrongNameLength)
    .max(100, wrongNameLength)
    .required(nameEmpty),
  description: yup
    .string()
    .min(10, wrongDescLength)
    .max(500, wrongDescLength)
    .required(descEmpty),
  subcategory: yup
    .number()
    .positive("Subcategory id musts be positive!")
    .required("Please select subcategory!"),
  image_url: yup.string().max(300),
  price: yup
    .number()
    .positive()
    .required("Please specify price for the service!"),
  duration: yup
    .number()
    .positive()
    .required("Please specify duration of the service!"),
  gap: yup.number().positive().required("Please specify gap between services!"),
});

module.exports = { serviceCreationSchema };
