const { DynamoDBDocumentClient, BatchWriteCommand } = require("@aws-sdk/lib-dynamodb");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const products = [
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
];

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

async function main() {
  try {
    const productPutRequests = products.map((item) => ({
      PutRequest: {
        Item: {
          'id': item.id,
          'title': item.title,
          'description': item.description,
          'price': item.price
        },
      },
    }));
    const stocksPutRequests = products.map((item) => ({
      PutRequest: {
        Item: {
          'product_id': item.id,
          'count': 3
        },
      },
    }));
    
    const command = new BatchWriteCommand({
      RequestItems: {
        ["products"]: productPutRequests,
        ["stocks"]: stocksPutRequests,
      },
    });
    await docClient.send(command);

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

main();

docClient.destroy();
client.destroy();