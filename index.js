var sha256 = require('./sha256');
var getUserInput = require('readline-sync');
var chalk = require('chalk');

var blockJson = {};
var blockString = '';
var nonce = 0;
var difficulty = 4;
var pattern = '0';

console.log(chalk.blue('--------------------------------------------------------------------------'));
console.log(chalk.blue('Type the word to generate hash.. '));
var userInput = getUserInput.question('>');

var shaResult = sha256(userInput);

console.log(chalk.blue('SHA256 for the word ' + userInput + ' is.. '));
console.log(chalk.green(shaResult));

blockJson = {
    userInput : userInput,
    nonce: nonce
};
blockString = JSON.stringify(blockJson);
var blockShaResult = sha256(blockString);

console.log('');
console.log(chalk.blue('--------------------------------------------------------------------------'));
console.log(chalk.blue('SHA256 for the block string ' + blockString + ' is.. '));
console.log(chalk.green(blockShaResult));

console.log('');
console.log(chalk.blue('--------------------------------------------------------------------------'));
console.log(chalk.blue('Now lets try to find a hash value with a pre defined pattern'));
console.log(chalk.blue('We have the difficulty set as : '+ difficulty));

//Calculating Pattern
for (var k = 1; k < difficulty; k++){
    pattern+= '0';
}

console.log(chalk.blue('Hash value should match the pattern : '+ pattern + '......'));


var patternFound = false;

while ( patternFound === false ) {
    blockShaResult = sha256(blockString);
    patternFound = (blockShaResult.substr(0, difficulty) === pattern);
    blockJson['nonce'] = nonce++;
    blockString = JSON.stringify(blockJson);
}

console.log(chalk.blue('SHA256 for the block string ' + blockString + ' and difficulty is ' + difficulty + '...'));
console.log(chalk.green(blockShaResult));

