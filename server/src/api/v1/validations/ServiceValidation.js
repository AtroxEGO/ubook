const yup = require("yup");
const moment = require("moment");
const {
  patternTwoDigisAfterComma,
  isValidFileType,
} = require("../helpers/Validation");

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
    .required("Please enter name of the service!"),
  description: yup
    .string()
    .min(10, wrongDescLength)
    .max(500, wrongDescLength)
    .required("Please enter description of the service!"),
  subcategory: yup
    .number()
    .positive("Subcategory id musts be positive!")
    .required("Please select subcategory!"),
  image: yup
    .mixed()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) =>
      isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test(
      "is-valid-size",
      "Max allowed size is 1Mb",
      (value) => value && value.size <= 1024000
    )
    .required("Please select image for the service!"),
  price: yup
    .number()
    .test(
      "is-decimal",
      "The amount should be a decimal with maximum two digits after comma",
      (val) => {
        if (val !== undefined) {
          return patternTwoDigisAfterComma.test(val);
        }
        return true;
      }
    )
    .positive()
    .required("Please specify price for the service!"),
  duration: yup
    .number()
    .integer("Duration must be full minutes")
    .max(1440, "Duration must be less than 24h")
    .positive()
    .required("Please specify duration of the service!"),
  gap: yup
    .number()
    .positive()
    .integer()
    .required("Please specify time gap between services!"),
  serviceHourStart: yup
    .string()
    .max(5)
    .min(5)
    .test(
      "is-before-serviceHourEnd",
      "Service start time must be before service end time",
      function (value) {
        const { serviceHourEnd } = this.parent;
        return moment(value, "HH:mm").isBefore(moment(serviceHourEnd, "HH:mm"));
      }
    )
    .required("Please specify start of service hours!"),
  serviceHourEnd: yup
    .string()
    .max(5)
    .min(5)
    .required("Please specify end of service hours!"),
});

const serviceUpdateSchema = yup.object().shape({
  id: yup.number().positive().required(),
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
  serviceHourStart: yup.number().positive().max(24).required(),
  serviceHourEnd: yup.number().positive().max(24).required(),
});

module.exports = { serviceCreationSchema, serviceUpdateSchema };
