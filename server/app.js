import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
