interface BmiInput{
  height: number,
  weight: number
}

const parseBmiInput = (args: Array<string>) : BmiInput => {
  if (args.length < 4) throw new Error('Too few arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error ('Values are not numbers.')
  }
}

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

try {
  const input = parseBmiInput(process.argv)
  console.log(calculator(input.height, input.weight))
} catch (e) {
  console.log(e.message)
}


export {calculator};