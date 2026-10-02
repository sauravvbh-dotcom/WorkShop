const cache = {};

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    if (cache[key]) {
        console.log("CACHE HIT:", key);

        return res.json(cache[key]);
    }

    console.log("CACHE MISS:", key);

    req.cacheKey = key;

    next();
}

module.exports = {
    cache,
    cacheMiddleware
};