const cache = {};

const TTL = 60 * 1000;


function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cached = cache[key];

    if (cached) {
        const age = Date.now() - cached.createdAt;

        if (age < TTL) {
            console.log("CACHE HIT:", key);

            res.setHeader("X-Cache", "HIT");

            return res.json(cached.data);
        }

        console.log("CACHE EXPIRED:", key);

        delete cache[key];
    }

    console.log("CACHE MISS:", key);

    res.setHeader("X-Cache", "MISS");

    req.cacheKey = key;

    next();
}


function setCache(key, data) {
    cache[key] = {
        data,
        createdAt: Date.now()
    };
}


function clearCache() {
    Object.keys(cache).forEach((key) => {
        delete cache[key];
    });

    console.log("CACHE CLEARED");
}


module.exports = {
    cache,
    cacheMiddleware,
    setCache,
    clearCache
};