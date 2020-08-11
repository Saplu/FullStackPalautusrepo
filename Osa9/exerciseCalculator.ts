interface TrainResult {
  totalDays: number;
  trainDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  explainedRating: string;
}

interface Rating {
  grade: number;
  explanation: string;
}

interface ExerciseInput {
  period: Array<number>,
  target: number
}

const parseArguments = (args: Array<string>) : ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments.')
  console.log(args)
  let wantedArgs = new Array<number>();
  var i;
  for (i = 2; i < args.length; i++){
    if (isNaN(Number(args[i]))) throw new Error('Values are not numbers.');
    wantedArgs = wantedArgs.concat(Number(args[i]))
  }

  return {
    period: wantedArgs.slice(1, wantedArgs.length),
    target: wantedArgs[0]
  }
}

const calculateRating = (average: number, goal: number) : Rating => {
  if (average >= goal) return {
    grade: 3,
    explanation: "Goal achieved, gj!"
  };
  else if (average < goal / 2) return {
    grade: 1,
    explanation: "You lazy s--t."
  }
  else return {
    grade: 2,
    explanation: "Almost there, bit harder next week!"
  }
}

const calculateSuccess = (report: Array<number>, goal: number) : TrainResult => {
  const average = report.reduce(function(a, b) {
    return a + b;
  }, 0) / report.length;

  const success = (average >= goal ? true : false);

  const rating = calculateRating(average, goal)

  return {
    totalDays: report.length,
    trainDays: report.filter(n => n !== 0).length,
    target: goal,
    average: average,
    success: success,
    rating: rating.grade,
    explainedRating: rating.explanation
  }
}

try {
  const { period, target } = parseArguments(process.argv);
  console.log(calculateSuccess(period, target));
} catch (e) {
  console.log(`Something went wrong: ${e.message}`)
}

//console.log(calculteSuccess([1, 2, 1, 0, 0, 0, 1.5], 2));