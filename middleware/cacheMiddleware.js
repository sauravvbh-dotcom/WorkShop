const cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    if (cache[key]) {
        console.log("CACHE HIT:", key);

        res.setHeader("X-Cache", "HIT");

        return res.json(cache[key]);
    }

    console.log("CACHE MISS:", key);

    res.setHeader("X-Cache", "MISS");

    req.cacheKey = key;

    next();
}

module.exports = {
    cache,
    cacheMiddleware
};