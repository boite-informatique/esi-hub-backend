module.exports = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500

	res.status(statusCode)
	console.log(err.message)
	res.json({
		error: err.message,
	})
}
