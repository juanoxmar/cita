const faker = require('faker');
// const moment = require('moment');

const db = require('./index');
const {
  // Appt,
  // Avail,
  Business,
  Service,
} = require('../model');

const business = [];
const service = [];
// const appt = [];
// const avail = [];

for (let i = 1; i <= 10; i += 1) {
  business.push({
    businessId: i,
    name: faker.company.companyName(),
    serviceType: 'Barber',
    street: faker.address.streetAddress(),
    city: 'Seattle',
    state: 'WA',
    zip: faker.address.zipCodeByState('WA'),
    photo: `https://cita-mvp.s3-us-west-2.amazonaws.com/images/image${i}.jpg`,
  });
  const services = [];
  for (let j = 1; j <= 5; j += 1) {
    services.push({
      service: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
      price: faker.random.number({ min: 10, max: 50 }),
      description: faker.commerce.productDescription(),
    });
  }
  service.push({
    businessId: i,
    services,
  });
}

const insertBusiness = () => Business.create(business);
const insertService = () => Service.create(service);
// const insertAvail = () => Avail.create(avail);
// const insertAppt = () => Appt.create(appt);

Promise.all([insertBusiness(), insertService()])
  .then(() => db.close());
