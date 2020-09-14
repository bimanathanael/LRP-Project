class Controllers {
  static welcome( req, res ) {
    res.status(200).json("hello")
  }
}

module.exports = Controllers