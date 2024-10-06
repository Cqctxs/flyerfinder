const Flyer = require("../data/Flyer");

const sortItemsByPrice = async (req, res) => {
  try {
    const { product } = req.params;
    const currentDate = new Date();
    const items = await Flyer.aggregate([
      { $match: { validUntil: { $gte: currentDate } } },
      { $unwind: "$flyer" },
      { $unwind: "$flyer.items" },
      { $match: { "flyer.items.name": product } },
      {
        $project: {
          _id: 0,
          item: "$flyer.items",
          seller: "$seller",
        },
      },
    ]);
    items.sort((a, b) => parseFloat(a.item.price) - parseFloat(b.item.price));
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const sortItemsByLocation = async (req, res) => {
  try {
    const { product } = req.params;
    const { lat, lon } = req.body;
    const currentDate = new Date();
    const items = await Flyer.aggregate([
      { $match: { validUntil: { $gte: currentDate } } },
      { $unwind: "$flyer" },
      { $unwind: "$flyer.items" },
      { $match: { "flyer.items.name": product } },
      {
        $project: {
          _id: 0,
          item: "$flyer.items",
          seller: "$seller",
        },
      },
    ]);
    items.sort((a, b) => {
      const distanceA = Math.sqrt(
        Math.pow(a.seller.coords.latitude - lat, 2) +
          Math.pow(a.seller.coords.longitude - lon, 2)
      );
      const distanceB = Math.sqrt(
        Math.pow(b.seller.coords.latitude - lat, 2) +
          Math.pow(b.seller.coords.longitude - lon, 2)
      );
      return distanceA - distanceB;
    });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { sortItemsByPrice, sortItemsByLocation };
