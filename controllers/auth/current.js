const current = async (req, res) => {
  res.json({
    user: req.user,
  });
};

module.exports = current;
