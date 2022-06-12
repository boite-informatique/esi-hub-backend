module.exports = (schema) => {
  return (req, res, next) => {
    const { body } = req

    const { error, value } = schema.validate(body)

    if (error) {
      throw new Error(error.details.map(i => {
        return ' ' + i.message.replace(/['"]/g, '').replace(/^\w/, c => c.toUpperCase())
      }))
    }

    req.body = value
    next()
  }
}
