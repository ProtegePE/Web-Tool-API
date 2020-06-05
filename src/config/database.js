require('dotenv').config({   
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env', 
});

module.exports = {
    //use_env_variable: "DATABASE_URL",
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || '5432',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
};