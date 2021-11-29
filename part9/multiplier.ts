function multiplicator(a: number, b: number, printText: string) {
  console.log(printText, a * b);
}


multiplicator(2, 4, "Result:");


type Operation = "multiply" | "add" | "divide";


function calculator(a: number, b: number, op: Operation): number {
  switch(op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("cannot divide by 0!");
      return a / b;
    default:
      throw new Error("unknown operation");
  }
}


try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}