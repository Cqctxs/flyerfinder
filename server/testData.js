const seller = {
  store: "John's Store",
  name: "John Doe",
  phone: "555-555-5555",
  email: "johndoe@email.com",
};

const flyer = {
  pages: [
    {
      type: 0,
      items: [
        {
          name: "Organic Apples",
          price: 2.99,
          image: "https://example.com/apples.jpg",
        },
      ],
    },
    {
      type: 0,
      items: [
        {
          name: "Organic Bananas",
          price: 4.99,
          image: "https://example.com/apples.jpg",
        },
      ],
    },
  ],
};

const validUntil = new Date("2024-10-10");

console.log(JSON.stringify({ seller, flyer, validUntil }));