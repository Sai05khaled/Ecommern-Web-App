const cloudinary = require("cloudinary");
const router = require("express").Router();
require("dotenv").config();

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

router.delete("/:public_id", async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.UploadStream.destroy(public_id);
    res.status(200).send();
  } catch (error) {
    res.status(400).send(e.message);
  }
});



module.exports = router;
