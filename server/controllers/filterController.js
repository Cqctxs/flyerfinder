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
      { $project: { _id: 0, item: "$flyer.pages.items" } },
    ]);
    items.sort((a, b) => a.item.price - b.item.price);
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = { sortItemsByPrice };
