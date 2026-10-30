const { createApp } = require('./app');

const port = Number(process.env.PORT || 3000);
const app = createApp();

app.listen(port, () => {
  const level = process.env.LOG_LEVEL || 'info';
  console.log(`[${level}] PanierLocal API (${process.env.APP_ENV || 'dev'}) en écoute sur le port ${port}`);
});
