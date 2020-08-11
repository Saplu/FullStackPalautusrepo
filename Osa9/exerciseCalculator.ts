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

const CalculteSuccess = (report: Array<number>, goal: number) : TrainResult => {
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

console.log(CalculteSuccess([1, 2, 1, 0, 0, 0, 1.5], 2));