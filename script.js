class OutOfRangeError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Expression should only consist of integers and +-/* characters';
  }
}

class InvalidExprError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Expression should not have an invalid combination of operators';
  }
}

function evalString(expression) {
  try {
    if (/([+\-/*]{2,})/.test(expression)) {
      throw new InvalidExprError();
    }

    if (/^[+\-/*]/.test(expression)) {
      throw new SyntaxError('Expression should not start with an invalid operator');
    }

    if (/[+\-/*]$/.test(expression)) {
      throw new SyntaxError('Expression should not end with an invalid operator');
    }

    // Evaluate the expression here
    const result = eval(expression);
    return result;
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      throw error;
    } else {
      throw new OutOfRangeError();
    }
  }
}

// Example usage
try {
  const expression = '1 + 2 * 3';
  const result = evalString(expression);
  console.log(result);
} catch (error) {
  console.error(error.message);
}
