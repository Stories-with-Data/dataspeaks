module.exports = {
	mapViews: (req, res, next) => {
    if (req.session.mapViews) {
      // req.session.mapViews = 1
      req.session.mapViews++
    } else {
      req.session.mapViews = 1
		}
		next()
  },
	totalViews: (req, res, next) => {
		if (req.session.views) {
			// req.session.views = 1
			req.session.views++
		} else {
			req.session.views = 1
		}
		next()
	}
}
