const { Personal } = require('../../models/personal');

async function addFlatImage(req, res) {
  const { _id } = req.user;

  const { imageURL } = await Personal.findOne({ owner: _id });

  res.json({
    imageURL,
  });
}
module.exports = addFlatImage;
