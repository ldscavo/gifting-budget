module.exports = {
  getToken: req => {
    var parsedHeader =
      (req.get('Authorization') || '').split('Bearer ');

    return parsedHeader.length >= 2
      ? parsedHeader[1]
      : null;
  }
}