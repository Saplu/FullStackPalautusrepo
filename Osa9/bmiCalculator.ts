const calculator = (a: number, b: number) : string => {
  const c = (a / 100) ^2;
  const value = b / c;
  if (value < 15) return "Very severely underweight";
  else if (value < 16) return "Severely underweight";
  else if (value < 18.5) return "Underweight";
  else if (value < 25) return "Normal (healthy weight)";
  else if (value < 30) return "Overweight";
  else if (value < 35) return "Obese class I (Moderately obese)";
  else if (value < 40) return "Obese class II (Severely obese)";
  else return "Obese class III (Very severely obese)";
}

console.log(calculator(180, 123));