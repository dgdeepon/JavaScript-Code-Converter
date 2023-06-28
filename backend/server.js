
const express = require('express');
const app = express();
const cors=require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());


const openai = require('openai');
const {Configuration}=require('openai');

const configaration=new Configuration({
    apiKey: process.env.API_KEY
})

const chatGpt = new openai.OpenAIApi(configaration); 



app.post('/convert', (req, res) => {
  const option = req.body.option; 
  const obj={
    res,
    path:req.path,
    code:req.body.code
  }
processUserMessage(option,obj);
  
});

app.post('/debug',(req,res)=>{

  const option = ''; 
  const obj={
    res,
    path:req.path,
    code:req.body.code
  }
processUserMessage(option,obj);

})

app.post('/quality',(req,res)=>{

  const option = ''; 
  const obj={
    res,
    path:req.path,
    code:req.body.code
  }
processUserMessage(option,obj);

})


async function processUserMessage(option,obj) {
    let prompt;
    if(obj.path=='/convert'){
      prompt=`Become an code converter and convert this ${obj.code} JavaScript code to ${option} code and no need for explanation`;
    }else if(obj.path=='/debug'){
      prompt=`Become an senior JavaScript software Developer and debug this ${obj.code} code, with proper code and easier explanation`;
    }else if(obj.path=='/quality'){
      prompt=`Become an senior software developer and check the quality of this code ${obj.code}, upon this parameters 1.Code repetition should be as low as possible. 2.comments should be added to understand the code and comment should be relevant. 3.should not have unused codes. And in the give a score out of 100`
    }

    // console.log(prompt)
  try {
    const response =  await chatGpt.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages:[{role:'user',content:prompt}]
    });

    obj.res.send({ message: response.data.choices[0].message.content });
  } catch (error) {
      console.error('ChatGPT processing error:', error);
      obj.res.send('Oops! An error occurred while processing your message.');
  }
}


app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
