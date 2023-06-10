export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://localhost:27017/desafio-nodejs-mttechne',
  port: process.env.PORT || '3001',
};
