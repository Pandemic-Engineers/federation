let db = null

module.exports = {
    setClient(_db) { db = _db },
    getClient() { return db }
}