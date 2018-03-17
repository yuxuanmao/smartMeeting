const request = require('request')

// This is tone analyzer provided methods
// var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
// var tone_analyzer = new ToneAnalyzerV3({
//   username: '82a1f1c1-5255-4642-a016-0d8d21294ac2',
//   password: 'BSi6j2ZaJp2a',
//   version_date: '2017-09-21'
// });

// var params = {
//     'tone_input': require('./tone.json'),
//     'content_type': 'application/json'
// };

// tone_analyzer.tone(params, function(error, response) {
//     if (error)
//       console.log('error:', error);
//     else
//       console.log('success');
//       data = JSON.stringify(response, null, 2);
//     }
// );


var headers = {
    'Content-Type': 'application/json'
};

var options = {
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21',
    method: 'POST',
    headers: headers,
    body: JSON.parse(fs.readFileSync('911.json', 'utf8')),
    json: true,
    auth: {
        'user': '82a1f1c1-5255-4642-a016-0d8d21294ac2',
        'pass': 'BSi6j2ZaJp2a'
    }
};

// stand along callback for request to get data
function callback1(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('no error');
        return response.body.sentences_tone;
        
    }else{
        console.log('error');
        return [];
        
    }
}


function getCollection(callback) {
   //implement
  request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            return callback(response.body.sentences_tone);
            
        }else{
            console.log('error');
            return [];
            
        }
    });
}

// the item is sorted based on sentence_id
function getSortedCollection(callback) {
   //implement
   request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            return callback(response.body.sentences_tone);
            
        }else{
            console.log('error');
            return [];
            
        }
    });
}

// use the following to test your functions
getCollection(function(array){
  console.log("Total items in collection",array.length);
  console.log("First item in collection ",array[0]);
})

getSortedCollection(function(array) {
  console.log("Collection sorted ",array);
})
