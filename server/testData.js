const seller = {
  store: "John's Store",
  name: "John Doe",
  phone: "555-555-5555",
  email: "johndoe@email.com",
  coordinates: { lat: 43.807244912657715, lon: -79.22407422493382 },
};

const flyer = {
  pages: [
    {
      type: 1,
      items: [
        {
          name: "Organic Apples",
          price: 4.99,
          image: "https://example.com/apples.jpg",
        },
        {
          name: "Organic Peaches",
          price: 4.99,
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