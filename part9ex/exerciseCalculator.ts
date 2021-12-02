interface Summary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: string
}

export interface ExerciseValues {
  dailyHours: Array<number>,
  target: number
}


// function parseArguments(args: Array<string>): ExerciseValues {
//   if (args.length < 4) throw new Error("Not enough arguments.");
//   if (args.length > 4) throw new Error("Too many arguments.");

//   const dailyHours = JSON.parse(args[2]) as Array<number>;

//   if (!isNaN(Number(args[3])) &&
//       Array.isArray(dailyHours) &&
//       dailyHours.every(item => !isNaN(item))) {
//     return {
//       dailyHours,
//       target: Number(args[2])
//     };
//   } else {
//     throw new Error("You need to provide an array of numbers and another number.");
//   }
// }


const ratingDescriptions = ["You have to do better.", "Within the target range", "Exceeding expectations."];


export function calculateExercises(input: ExerciseValues): Summary {
  const average = input.dailyHours.reduce((acc, elem) => acc + elem, 0) / input.dailyHours.length;
  const achievement = average / input.target;

  let rating = 2;
  if (achievement > 1.5) {
    rating = 3;
  }
  if (achievement < 0.75) {
    rating = 1;
  }

  return {
    periodLength: input.dailyHours.length,
    trainingDays: input.dailyHours.filter(hours => hours !== 0).length,
    success: average >= input.target,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target: input.target,
    average: average.toFixed(2)
  };
}


// try {
//   console.log(calculateExercises(parseArguments(process.argv)));
// } catch(error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }