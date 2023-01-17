const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object().keys({
  firstname: yapValidations.name.required().label("First Name"),
  lastname: yapValidations.name.required().label("Last Name"),
  emailid: yapValidations.email.required().label("Email ID"),
  password: yapValidations.password.required().label("Password"),
});

module.exports = Joi.object()
  .keys({
    page_no: yapValidations.pageNumber.default(1).label("Page Number"),
    page_size: yapValidations.pageSize.default(100).label("Page Size"),
    sort_by: yapValidations.sortBy.default("created_at").label("Sort By"),
    sort_order: yapValidations.sortOrder.default("desc").label("Sort Order"),
    status: yapValidations.status.label("Status"),
    search: yapValidations.searchQuery.label("Search Query"),
    ids: Joi.array().items(yapValidations.id).label("Ids"),
  })
  .unknown(true);
