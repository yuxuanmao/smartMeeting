# Assignment #1

Implement the following two functions:

- getCollection: it should accept a callback, send a request to retrieve the full collection from your chosen API, wait until a response is received and callback with an array of objects, where each object is an item from the collection.  You are free to decide how many items are returned.

- getSortedCollection: it should accept a callback, retrieve the full collection, sort the collection using the criteria you think makes the most sense for its items and callback with a sorted array of objects.

Run using `node main.js`


---------------------------------- 

### Team Members: 

Yuxuan Mao 1002620363

Kerjohn Chen 1002252741

Zhihan Jia 1001204671

Qian Wang 1002400779

### Introduction: Web app SmartMeeting
Online chatting makes life easier. Nowadays as people rely more on the convenience online chatting provides, they attempt to integrate it not only into casual conversations but also formal meetings. However, whether it is a weekly planning meeting with your manager when you all from home, or an import meeting with a client oversea, convenience remains an important issue but it is certainly not the only factor that needs to be taken into consideration. The lack of facial expressions, tones and body languages, together with the formalism of the nature of these meetings restrict people’s ability to interpret and express subtle emotions. The misinterpretations of a customer’s attitude, or the struggle to understand your manager’s real intention can lead to unwanted consequences. Because of this shortcoming many go back to old fashioned face-to-face meetings. SmartMeeting tackles this dilemma of convenience versus accuracy by integrating advanced technology based on the theory of psycholinguistics into a chatting app that is specifically designed for meetings. 

##### What can users expect?
1. the ability to signup, create credentials and join multiple organizations, add other users to contacts.
2. being able to chat realtime either through text or voice. Receive real time analysis of the tone. Get report of the whole meeting afterwords and other analysis based on tone.
3. A clean user interface with only necessary features meant specifically for meetings. An easy way to document past meetings and analysis reports. Gain insight from the reports as meeting number accumulate and certain patterns start to imerge. 

### API Consideration Questions:

##### 1. Is the API well documented?

a) Is there enough information to understand the collections and resources it manages?
  
Yes. The IBM Watson Tone Analyzer provides well documented information. It contains detailed step-to-step instructions 
on how to access and utilize the API. The user calls the Tone Analyzer with a json file containing a plain text paragraph, 
and the API will return a collection containing the tone(s) of each sentence, and the general tone(s) of the paragraph. 
         
b) Does the documentation offer explanations and examples on how to use it and various options available across each 
   method/URL.
     
Yes. The documentation clearly explains the format of the input required, which API url to call, and the type of output we could expect. It also provides sample input files for us to practice using the API with. 

##### 2. Does this API uses a RESTful notation to access such collections / resources? 

The API is designed based on RESTful notations and it has GET, POST methods. For example, the sample code below is found on the IBM Watson Tone Analyzer documentation [page](https://console.bluemix.net/docs/services/tone-analyzer/getting-started.html#getting-started-tutorial), and it shows us how to make the POST API call with a json file called tone.json, 

```
curl -X POST --user "{username}":"{password}" \
--header "Content-Type: application/json" \
--data-binary @{path_to_file}tone.json \
"https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21"
```

For POST calls you need to provide an json object as input, and for GET calls you just need to encode the text string in the URL as input. 


The following is an code example to show us how to call the API in javascript files, and is obtained from the IBM Watson Tone Analyzer page [here](https://www.ibm.com/watson/developercloud/tone-analyzer/api/v3/?node#error-handling).
   
  ```javascript  
 	var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

	var tone_analyzer = new ToneAnalyzerV3({
	  username: '{username}',
	  password: '{password}',
	  version_date: '2017-09-21'
	});

	var params = {
	  'tone_input': require('tone.json'),
	  'content_type': 'application/json'
	};


	tone_analyzer.tone(params, function(error, response) {
	  if (error)
	    console.log('error:', error);
	  else
	    console.log(JSON.stringify(response, null, 2));
	  }
	);   
```

##### 3. Which HTTP methods are supported by the API? Note that most public APIs will restrict users from jeopardizing the data.

POST: Send the new API credentials in order to use the service.

GET: Retrieve the list of the tone analyze result of text/texts.

PUT: None

DELETE: None
  
##### 4. Explain how the information about these resources/collections will be integrated into your application.

Our project is a web-chat application called Smart Meeting. The two highlighted features of our product are voice-to-text and text-tone analysis, which we are planning to build using the IBM Watson Speech to Text and Tone Analyzer APIs. When users input text, our application will make calls to the Tone Analyzer API to analyze the tone of the message. After receiving the result, we will print an emotion sticker beside the message which corresponds to the correct tone of the text. If the user sends voice messages, we will first use the Speech to Text API to translate the message into text, then apply the same procedure to get the tone analysis of the text message. 



  


