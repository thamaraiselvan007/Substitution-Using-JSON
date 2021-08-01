const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { objectExpression } = require('babel-types');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/page.html')});

 async function extract(data) {
      var people = [];
    var values = data["values"].split("\n");
    var para = data["para"];
    var key_value_pair;
    var person = {};
    for (line of values) {
      if (line.trim().length == 0) {
        people.push(person);
        person = {};
      }
      else {
        key_value_pair = line.split(" ");
        var right = "";
        for (var i=1; i<key_value_pair.length; i++) {
          right += " "+key_value_pair[i];
        }
        person[key_value_pair[0]] = right.trim();
      }
    }
    if (Object.keys(person).length > 0) {
      people.push(person);
    }
    var result = [];
    for (person of people) {
      var para_with_person = para;
      for (key of Object.keys(person)) {
        para_with_person = para_with_person.replace("#"+key, person[key])
      }
      result.push(para_with_person);
    }
          return result;
  }

  app.post("/update", async (req , res) => {
    var data = await req.body;
    result  = await extract(data);
    console.log(result);
    res.send(result);
});
const port = 3000
app.listen(port , () => console.log(`This app is listening on port 3000`));