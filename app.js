const express = require('express');
const mongoClient  = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017';

var student = 'student';
var question = 'question';
var quiz = 'quiz';
var response = 'response';

var mydb='bestquiz';
var student_cursor;
var question_cursor;
var quiz_cursor;
var response_cursor;



app = express();

app.listen(8800);
app.use(bodyParser.json());

app.get('/ping',function(req,res){res.send('Pinging hallo world')})


// Connect to the db
mongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
  if(!err) {
    student_cursor = client.db(mydb).collection(student);
    question_cursor = client.db(mydb).collection(question);
    quiz_cursor = client.db(mydb).collection(quiz);
    response_cursor = client.db(mydb).collection(response);	
  }
});



//Students:
app.get('/students',function(req,res){
        student_cursor.find(req.query).toArray(function(err,documents){console.log(req.query)
        res.seth
		res.json({records:documents})});
});

app.post('/students',function(req,res){
    student_cursor.insertOne(req.body,function(err,result){
        if(err){res.json(err)}
        else{console.log({inserted_id:result.insertedId}); res.json({inserted_id:result.insertedId})
        } });
});

app.put('/students',function(req,res){
    student_cursor.updateOne(req.query,{$set:req.body},{upsert:true},function(err,response){
        if(err){jj = err}else{jj = response}
        res.json({result:jj})
    })
});



//Questions
app.get('/questions',function(req,res){
        question_cursor.find(req.query).toArray(function(err,documents){console.log(req.query)
        res.json({records:documents})});
});

app.post('/questions',function(req,res){
    question_cursor.insertOne(req.body,function(err,result){
        if(err){res.json(err)}
        else{console.log({inserted_id:result.insertedId}); res.json({inserted_id:result.insertedId})
        } });
});

app.put('/questions',function(req,res){
    question_cursor.updateOne(req.query,{$set:req.body},{upsert:true},function(err,response){
        if(err){jj = err}else{jj = response}
        res.json({result:jj})
    })
});


app.get('/questions/:quizid/:count',function(req,res){
        question_cursor.aggregate([{'$match':{'quiz_id':req.params.quizid}},{'$sample':{'size':parseInt(req.params.count)}}]).toArray(function(err,documents){console.log(req.query)
        res.json({records:documents})});
});



//quiz
app.get('/quiz',function(req,res){
        quiz_cursor.find(req.query).toArray(function(err,documents){console.log(req.query)
        res.json({records:documents})});
});

app.post('/quiz',function(req,res){
    quiz_cursor.insertOne(req.body,function(err,result){
        if(err){res.json(err)}
        else{console.log({inserted_id:result.insertedId}); res.json({inserted_id:result.insertedId})
        } });
});

app.put('/quiz',function(req,res){
    quiz_cursor.updateOne(req.query,{$set:req.body},{upsert:true},function(err,response){
        if(err){jj = err}else{jj = response}
        res.json({result:jj})
    })
});




//response
app.get('/responses',function(req,res){
        response_cursor.find(req.query).toArray(function(err,documents){console.log(req.query)
        res.json({records:documents})});
});

app.post('/responses',function(req,res){
    response_cursor.insertOne(req.body,function(err,result){
        if(err){res.json(err)}
        else{console.log({inserted_id:result.insertedId}); res.json({inserted_id:result.insertedId})
        } });
});

app.put('/responses',function(req,res){
    response_cursor.updateOne(req.query,{$set:req.body},{upsert:true},function(err,response){
        if(err){jj = err}else{jj = response}
        res.json({result:jj})
    })
});
