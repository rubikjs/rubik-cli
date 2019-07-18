module.exports = function (app) {
  app.get('/data', function (req, res) {
    res.json({
      'data': '5'
    })
  })
}
