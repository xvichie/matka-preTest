const fs = require('fs');
const path = require("path");

const jsonPath = 'SimilarsForEveryTest.json'; // Specify the correct file path
const filePath = path.resolve(__dirname, jsonPath);

let SimilarsJSON;

try {
  SimilarsJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) { 
  console.error('Error reading JSON file:', err);
  return; // Exit the function if there's an error
}

module.exports = () => {
  Object.keys(SimilarsJSON).forEach((SimilarsYears) => {
    Object.keys(SimilarsJSON[SimilarsYears]).forEach((SimilarVersions) => {
      Object.keys(SimilarsJSON[SimilarsYears][SimilarVersions]).forEach((SimilarsProblems) => {
        SimilarsJSON[SimilarsYears][SimilarVersions][SimilarsProblems].forEach((SimilarProblem) => {
          const split = SimilarProblem.split('-');
          const year = parseInt(split[0]);
          const version = parseInt(split[1]);
          const problem = parseInt(split[2]);
          const targetArray = SimilarsJSON[year][version][problem];

          // Check if the similar problem doesn't already exist
          if (!targetArray.includes(SimilarsYears + '-' + SimilarVersions + '-' + SimilarsProblems)) {
            targetArray.push(SimilarsYears + '-' + SimilarVersions + '-' + SimilarsProblems);
          }
        });
      });
    });
  });

  try {
    fs.writeFileSync(filePath, JSON.stringify(SimilarsJSON, null, 2)); // Format JSON with indentation
    console.log('SimilarsForEveryTest.json updated successfully.');
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
};