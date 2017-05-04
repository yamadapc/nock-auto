"use strict";
exports.__esModule = true;
var child_process = require("child_process");
var jsfmt = require("jsfmt");
var _ = require("lodash");
function run() {
    var testout = child_process.execSync('mocha --require nock-auto/lib/record').toString();
    console.log(parse(testout.toString()));
}
exports.run = run;
function parse(inputStr) {
    var parsed = _(inputStr.split('<<<<<<-- cut here -->>>>>>'))
        .map(function (item, i) {
        if (i % 2 === 0)
            return;
        return item;
    })
        .compact()
        .map(function (item) {
        return _.trim(item, "\n\t ");
    })
        .value();
    var config = jsfmt.getConfig();
    return _.map(parsed, function (item) {
        return jsfmt.format(item, config);
    }).join('\n');
}
exports.parse = parse;
function main() {
    var program = require('commander');
    program
        .usage('<command> [options]')
        .command('test', 'Runs tests and capture their HTTP requests automatically')
        .parse(process.argv);
    if (!program.command) {
        program.displayHelp();
        process.exit(1);
    }
}
exports["default"] = main;
