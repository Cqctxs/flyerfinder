const addFlyer = async (req, res) => {
    try {
        const { seller, flyer, validUntil } = req.body;
        const uploadFlyer = new Flyer({ seller, flyer, validUntil });
        await uploadFlyer.save();
        res.json({ success: true, status: "Flyer uploaded" });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
}

const getFlyers = async (req, res) => {
  const currentDate = new Date(); // Get the current date and time
  try {
    const flyers = await Flyer.find();
    res.json({ success: true, flyers });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}