import TheoremsInfoJSON from '../assets/theorems/theorems.json';


//console.log(TheoremsInfoJSON);

export const getAllTheorems = (TheoremsAlgGeo) => {
    let allTitles = [];
    TheoremsAlgGeo.forEach(TheoremAlgGeo => {
        TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()]
            .forEach((theorem) => {
                allTitles.push({ ...theorem, TheoremAlgGeo });
            })
    })
    return allTitles;
}

export const handleSearch = ((TheoremsAlgGeo, SearchTerm) => {
    let allTitles = [];
    TheoremsAlgGeo.forEach(TheoremAlgGeo => {
        TheoremsInfoJSON[TheoremAlgGeo.toLowerCase()]
            .forEach((theorem) => {
                allTitles.push({ ...theorem, TheoremAlgGeo });
            })
    })

    //console.log(allTitles)

    let matchedTheorems = [];
    allTitles.forEach((theorem) => {
        //console.log(theorem);
        if (theorem.title.includes(SearchTerm)) {
            matchedTheorems.push(theorem)
        }
    });

    return matchedTheorems;
});