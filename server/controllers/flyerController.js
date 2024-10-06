const Flyer = require("../data/Flyer");

const addFlyer = async (req, res) => {
    try {
      const { seller, flyer, validUntil } = req.body; // Date format YYYY-mm-dd
      console.log(seller, flyer, validUntil);
      const uploadFlyer = new Flyer({ seller, flyer, validUntil });
      console.log(uploadFlyer);
      await uploadFlyer.save();
      res.json({ success: true, status: "Flyer uploaded" });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

const getFlyers = async (req, res) => {
  const currentDate = new Date(); // Get the current date and time
  try {
    const flyers = await Flyer.find({validUntil: { $gte: currentDate }});
    res.json({ success: true, flyers });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

const getFlyerFromID = async (req, res) => {
  try {
    const flyer = await Flyer.findById(req.params.id);
    res.json({ success: true, flyer });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

module.exports = { addFlyer, getFlyers, getFlyerFromID };