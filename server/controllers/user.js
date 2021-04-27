const user = (req, res) => {
  res.json({ data: 'hey you hit user API endpoint' });
  res.end();
};

module.exports = user;
