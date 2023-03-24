const returnClarifaiJSONRequest = (imageURL) => {
    const PAT = 'b8ff20a063114b7faef50ce138ccaf19';
    const USER_ID = 'st0w3';       
    const APP_ID = 'FacialRecognition';
    const IMAGE_URL = imageURL;
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
  });
    return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  }

export default (req, res) => {
    console.log(req.body.imageURL);
  fetch('https://api.clarifai.com/v2/models/' + 'face-detection' 
  + '/outputs', returnClarifaiJSONRequest(req.body.imageURL))
  .then(response => response.json())
  .then(response =>{
    console.log(response);
    res.json(response);
  })
  .catch(err => {
    res.status(400);
  })
};
