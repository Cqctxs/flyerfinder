const seller = {
  user: "seanzhao2007@gmail.com",
  pwd: "abc",
  store: "Sean's Supermarket",
  phone: "6473635595",
  coords: { lat: 43.807244912657715, lng: -79.22350487614052 },
};

const flyer = {
  pages: [
    {
      type: 2,
      items: [
        {
          name: "Organic Apples",
          price: 4.99,
          image: "/images/apple.png",
        },
        {
          name: "Organic Peaches",
          price: 4.99,
          image: "/images/peaches.png",
        },
      ],
    },
  ],
};

const validUntil = new Date("2024-10-10");

console.log(JSON.stringify({ seller, flyer, validUntil }));
