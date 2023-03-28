const { Personal } = require('../../models/personal');

async function changeFlatImage(req, res) {
  const { _id } = req.user;

  const imageURL = req.file.path;

  await Personal.findOneAndUpdate(
    { owner: _id },
    { $set: { imageURL } },
    { new: true }
  );

  res.json({
    imageURL,
  });
}
module.exports = changeFlatImage;
