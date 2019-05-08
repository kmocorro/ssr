import app from './app'

const port = process.env.PORT || 7007

app.listen(port);
console.log(`listening at ${port}`);