const Joi = require('joi');
const yapValidations = require('@yapsody/lib-validations');

module.exports = Joi.object()
  .keys({
    name: yapValidations
      .name
      .required()
      .label('Name'),
    description: yapValidations
      .description
      .label('Description'),
  });

module.exports = yapValidations.id.required().label('Id');

module.exports = Joi.object()
  .keys({
    page_no: yapValidations.pageNumber.default(1).label('Page Number'),
    page_size: yapValidations.pageSize.default(100).label('Page Size'),
    sort_by: yapValidations.sortBy.default('created_at').label('Sort By'),
    sort_order: yapValidations.sortOrder.default('desc').label('Sort Order'),
    status: yapValidations.status.label('Status'),
    search: yapValidations.searchQuery.label('Search Query'),
    ids: Joi.array().items(yapValidations.id).label('Ids'),
  })
  .unknown(true);

module.exports = yapValidations.enable.default('false').label('Id');

module.exports = Joi.object()
  .keys({
    name: yapValidations
      .name
      .label('Name'),
    description: yapValidations
      .description
      .label('Description'),
    enable: yapValidations
      .enable
      .label('Enable'),
    version: yapValidations
      .id
      .when('enable', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required(),
      })
      .label('Version'),
  }).min(1);