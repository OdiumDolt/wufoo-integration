function get_forum_data(data: any){
    var uri = '/get-form-data'
    return fetch(uri, {
        headers:{
            "data":JSON.stringify(
                {
                "subdomain":data.subdomain,
                "api_key":data.api_key,
                "form_id":data.form_id,
                "data_type":data.type
                }
            ),
        }
    })
    .then(resonse => {
        return resonse.text()
    })
    .then(responseText => {
        return JSON.parse(responseText) 
    })
    .catch(error => {console.log(error)})
}   

export {
    get_forum_data
}
