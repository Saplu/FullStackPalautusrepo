interface BmiInput{
  height: number,
  weight: number
}

let errorMessage = '';

const parseBmiInput = (args: Array<string>) : BmiInput => {
  if (args.length < 4) {
    errorMessage = 'Too few arguments.';
    throw new Error;
  }
  if (args.length > 4) {
    errorMessage = 'Too many arguments.';
    throw new Error;
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    errorMessage = 'Values are not numbers.';
    throw new Error;
  }
};  

const calculator = (a: number, b: number) : string => {
  const c = Math.pow(a / 100 , 2);
  const value = b / c;
  if (value < 15) return "Very severely underweight";
  else if (value < 16) return "Severely underweight";
  else if (value < 18.5) return "Underweight";
  else if (value < 25) return "Normal (healthy weight)";
  else if (value < 30) return "Overweight";
  else if (value < 35) return "Obese class I (Moderately obese)";
  else if (value < 40) return "Obese class II (Severely obese)";
  else return "Obese class III (Very severely obese)";
};

try {
  const input = parseBmiInput(process.argv);
  console.log(calculator(input.height, input.weight));
} catch (e){
  console.log(errorMessage);
  errorMessage = '';
}


export {calculator};