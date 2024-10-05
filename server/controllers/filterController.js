const Flyer = require("../data/Flyer");

const sortItemsByPrice = async (req, res) => {
  try {
    const { product } = req.body;
    const currentDate = new Date();
    const items = await Flyer.aggregate([
      { $match: { validUntil: { $gte: currentDate } } },
      { $unwind: "$flyer.pages" },
      { $unwind: "$flyer.pages.items" },
      { $match: { "flyer.pages.items.name": product } },
      {
        $project: {
          _id: 0,
          item: "$flyer.pages.items",
          seller: "$seller",
        },
      },
    ]);
    items.sort((a, b) => a.item.price - b.item.price);
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const sortItemsByLocation = async (req, res) => {
  try {
    const { product, lat, lon } = req.body;
    const currentDate = new Date();
    const items = await Flyer.aggregate([
      { $match: { validUntil: { $gte: currentDate } } },
      { $unwind: "$flyer.pages" },
      { $unwind: "$flyer.pages.items" },
      { $match: { "flyer.pages.items.name": product } },
      {
        $project: {
          _id: 0,
          item: "$flyer.pages.items",
          seller: "$seller",
        },
      },
    ]);
    items.sort((a, b) => {
      const distanceA = Math.sqrt(
        Math.pow(a.seller.coordinates.lat - lat, 2) +
          Math.pow(a.seller.coordinates.lon - lon, 2)
      );
      const distanceB = Math.sqrt(
        Math.pow(b.seller.coordinates.lat - lat, 2) +
          Math.pow(b.seller.coordinates.lon - lon, 2)
      );
      return distanceA - distanceB;
    });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { sortItemsByPrice, sortItemsByLocation };
