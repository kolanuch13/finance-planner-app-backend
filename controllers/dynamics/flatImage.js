const { Personal } = require('../../models/personal');

async function flatImage(req, res) {
  const owner = req.user._id;

  const imageURL = req.file.path;

  await Personal.findByIdAndUpdate(owner, { imageURL });

  res.json({
    imageURL,
  });
}
module.exports = flatImage;
