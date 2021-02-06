module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'JnTjjXa5EX',
        password: process.env.MYSQL_PASS || 'KEzYq5xsEs',
        database: process.env.MYSQL_DB || 'JnTjjXa5EX',
    },
    unirest: {
        host: process.env.X_RAPIDAPI_HOST || 'bravenewcoin.p.rapidapi.com',
        key: process.env.X_RAPIDAPI_KEY || '3ca3575730msh997967112f4241bp1a136cjsn5ea0550bd80c',
    }
}