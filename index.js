#!/usr/bin/env node
const program = require ('commander');
const inquirer = require ('inquirer');
const resolver = require ('./resolver');

program
  .option ('-n, --numbers [numbers]', 'numbers to resolve')
  .parse (process.argv);

let questions = [
  {
    type: 'input',
    name: 'numbers',
    message: 'Input numbers to resolve',
    default: program.numbers,
    when: !program.numbers,
  },
];

const timed = func => {
  let start = new Date ();
  func ();
  console.log (`used: ${new Date () - start}ms`);
};

const resolve = numbers => {
  timed (() => resolver (...numbers.split (',').map (parseFloat)));
};

if (program.numbers) {
  resolve (program.numbers);
  process.exit();
}

const prompt = () =>
  inquirer.prompt (questions).then (function (answers) {
    resolve (answers.numbers);
    prompt ();
  });
prompt ();
