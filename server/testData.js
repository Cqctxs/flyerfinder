const seller = {
  store: "John's Store",
  name: "John Doe",
  phone: "555-555-5555",
  email: "johndoe@email.com",
};

const flyer = {
  items: [
    {
      name: "Organic Apples",
      price: 2.99,
      image: "https://example.com/apples.jpg",
    },
    {
      name: "Organic Bananas",
      price: 1.99,
      image: "https://example.com/bananas.jpg",
    },
  ],
};

const validUntil = new Date("2024-10-05");

console.log(JSON.stringify({ seller, flyer, validUntil }));