import SimilarsJSON from '../assets/SimilarsForEveryTest.json';

export const updateSimilars = () => {
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
};