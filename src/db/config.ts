
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PWD = process.env.DB_PWD;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const config = {
  url: `mongodb://${DB_USER}:${DB_PWD}@` +
    `${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
};

export {config};
