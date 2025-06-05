import app from './app';

const port = Number(process.env.PORT) || 3333;

app.listen(port,'0.0.0.0', () => {
  console.log(`Server running on http://'0.0.0.0':${port}`);
});
