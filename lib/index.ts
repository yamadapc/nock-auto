import * as child_process from 'child_process';
import * as jsfmt from 'jsfmt';
import * as _ from 'lodash';

export function run() {
  const testout = child_process.execSync('mocha --require nock-auto/lib/record').toString();
  console.log(parse(testout.toString()));
}

export function parse(inputStr) {
  const parsed = _(inputStr.split('<<<<<<-- cut here -->>>>>>'))
    .map(function(item, i) {
      if(i % 2 === 0) return;
      return item;
    })
    .compact()
    .map(function(item) {
      return _.trim(item, "\n\t ");
    })
    .value();

  const config = jsfmt.getConfig();
  return _.map(parsed, function(item) {
    return jsfmt.format(item, config);
  }).join('\n');
}

export default function main() {
  const program = require('commander');
  program
    .usage('<command> [options]')
    .command('test', 'Runs tests and capture their HTTP requests automatically')
    .parse(process.argv);

  if (!program.command) {
    program.displayHelp();
    process.exit(1);
  }
}
