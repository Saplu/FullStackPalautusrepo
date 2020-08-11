import express from 'express';
import { calculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/:bmi?', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)){
    res.send({
      error: 'Malformatted parameters.'
    })
  }
  const bmi = calculator(Number(req.query.height), Number(req.query.weight));
  const result = {
    height,
    weight,
    bmi
  }
  res.send(result)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});