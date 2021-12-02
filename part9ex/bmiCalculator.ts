interface BMIvalues {
  height: number,
  weight: number
}


function parseArguments(args: Array<string>): BMIvalues {
  if (args.length < 4) throw new Error("Not enough arguments.");
  if (args.length > 4) throw new Error("Too many arguments.");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("You need to provide two _numbers_.");
  }
}


function calculateBMI(input: BMIvalues): string {
  const BMI = input.weight / Math.pow(input.height / 100, 2);

  const phrase = `BMI: ${BMI.toFixed(2)} - `;

  if (BMI < 18.5) return phrase + "Underweight";
  if (BMI > 24.9) return phrase + "Overweight";
  return phrase + "Normal";
}


try {
  console.log(calculateBMI(parseArguments(process.argv)));
} catch(error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBMI;