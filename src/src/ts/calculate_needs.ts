function calculate_needs(fields: any, entry: any){
    fields = JSON.parse(fields)
    let needs = {
        "Love/Connection":{"total":0, "Need":"Love&Connection", "class": "love", "Yes":[], "Partially":[], "No":[]}, 
        "Significance":{"total":0, "Need":"Significance", "class": "significance", "Yes":[], "Partially":[], "No":[]},
        "Certainty":{"total":0, "Need":"Certainty", "class": "certainty", "Yes":[], "Partially":[], "No":[]}, 
        "Variety":{"total":0, "Need":"Variety", "class": "variety", "Yes":[], "Partially":[], "No":[]}, 
        "Growth":{"total":0, "Need": "Growth", "class": "growth", "Yes":[], "Partially":[], "No":[]},
        "Contribution":{"total":0, "Need":"Contribution", "class": "contribution", "Yes":[], "Partially":[], "No":[]}}
    for (let field of Object.keys(fields)){
        if (fields[field]["Need"] != "None"){
            console.log(entry[fields[field].ID])
            if(entry[fields[field].ID] == "Yes"){
                needs[fields[field].Need].total += 10
                needs[fields[field].Need].Yes.push(fields[field].Title)
            }
            else if(entry[fields[field].ID] == "Partially"){
                needs[fields[field].Need].total += 5
                needs[fields[field].Need].Partially.push(fields[field].Title)
            }
            else if (entry[fields[field].ID] == "No"){
                needs[fields[field].Need].No.push(fields[field].Title)
            }
        }   
    }


   return needs
}

export {
    calculate_needs
}