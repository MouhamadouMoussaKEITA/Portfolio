const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('CV_Mouhamadou Moussa KEITA.pdf');
pdf(dataBuffer).then(function(data) {
  console.log(data.text);
});
