const rightValue = 24;

const resolver = (...numbers) => {
  for (let formula of formulas) {
    for (let op1 of ops) {
      for (let op2 of ops) {
        for (let op3 of ops) {
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              if (j == i) continue;
              for (let k = 0; k < 4; k++) {
                if (k == j || k == i) continue;
                for (let l = 0; l < 4; l++) {
                  if (l == k || l == j || l == i) continue;

                  let a = numbers[i],
                    b = numbers[j],
                    c = numbers[k],
                    d = numbers[l];
                  let result = formula (a, b, c, d, op1, op2, op3);
                  if (result == 24) {
                    if (formula.name == 'formula1')
                      console.log (
                        `${a} ${op1.alias} ((${b} ${op2.alias} ${c}) ${op3.alias} ${d})`
                      );
                    else
                      console.log (
                        `(${a} ${op1.alias} ${b}) ${op2.alias} (${c} ${op3.alias} ${d})`
                      );
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const ops = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a / b,
];

ops[0].alias = '+';
ops[1].alias = '-';
ops[2].alias = '*';
ops[3].alias = '/';

const formulas = [
  function formula1 (a, b, c, d, op1, op2, op3) {
    return op1 (a, op3 (op2 (b, c), d));
  },
  function formula2 (a, b, c, d, op1, op2, op3) {
    return op2 (op1 (a, b), op3 (c, d));
  },
];

module.exports = resolver;
