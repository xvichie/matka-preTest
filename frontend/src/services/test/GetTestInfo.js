
const GetVersions = (Year) => {
    const VersionInfoJSON = require('../../assets/' + Year + '/info.json');
    // console.log(VersionInfoJSON);
    return Array.from({ length: VersionInfoJSON['NumberOfVersionsInThatYear'] }, (_, i) => i + 1);
};

const GetProblems = (Year) => {
    const VersionInfoJSON = require('../../assets/' + Year + '/info.json');
    return Array.from({ length: VersionInfoJSON['NumberOf1PointProblems'] + VersionInfoJSON['NumberOf2PointProblems'] 
    + VersionInfoJSON['NumberOf3PointProblems'] + VersionInfoJSON['NumberOf4PointProblems']}, (_, i) => i + 1);
};

export { GetVersions, GetProblems };
