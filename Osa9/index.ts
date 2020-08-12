import express from 'express';
import { calculator } from './bmiCalculator';
import { calculateSuccess } from './exerciseCalculator';

const app = express();
app.use(express.json());

const valueChecker = (arr: Array<number>) : boolean => {
  let i = 0;
  for (i = 0; i < arr.length; i++){
    if (isNaN(Number(arr[i]))){
      return false;
    }
  }
  return true;
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/:bmi?', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);
  if (isNaN(height) || isNaN(weight)){
    response.status(400).json('Invalid parameters');
  }
  const bmi = calculator(height, weight);
  const result = {
    height,
    weight,
    bmi
  };
  response.status(200).json(result);
});

app.post('/exercises', (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target){
    res.status(400).json('Parameters missing.');
  }
    //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!valueChecker(req.body.daily_exercises) || isNaN(req.body.target)){
    res.status(400).json('Malformatted parameters');
  }
  //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const value = calculateSuccess(req.body.daily_exercises, req.body.target);
  res.status(200).json({
    value
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});