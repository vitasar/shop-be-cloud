'use strict';

module.exports.getProductsList = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify([
        {
          description: "Short Product Description1",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
          price: 24,
          title: "Headphones One",
        },
        {
          description: "Short Product Description7",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
          price: 15,
          title: "Headphones Title",
        },
        {
          description: "Short Product Description2",
          id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
          price: 23,
          title: "Headphones ",
        },
        {
          description: "Short Product Description4",
          id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
          price: 15,
          title: "Headphones Test",
        },
        {
          description: "Short Product Descriptio1",
          id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
          price: 23,
          title: "Headphones 2",
        },
        {
          description: "Short Product Description7",
          id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
          price: 15,
          title: "Headphones Name",
        },
      ])
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};