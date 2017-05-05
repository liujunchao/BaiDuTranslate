var fs = require('fs');
var dic = {};

function readJson(lan) { 
  (function (lan) { 
        fs.readFile("languages/"+lan+'.json',function(err, data){
        if(err){ 
            console.log(err.message);
            dic[lan] = {};
        }else{ 
            dic[lan] = JSON.parse(data.toString());
        }
    });
   }(lan));
};
 
function saveJsonItem(lan,key,value) {  
  
    var obj = dic[lan];
    obj[key] = value;
    var jsonString = JSON.stringify(obj);
        fs.writeFile('languages/'+lan+'.json',jsonString,function(err){
           // console.log('done');
        });
};

var countries = [
    { "name": "Deutsch", "code": "de", "image": "de.png" }, 
    { "name": "English", "code": "en", "image": "gb.png" }, 
    { "name": "Espa\u00f1ol", "code": "spa", "image": "es.png" },
    { "name": "Fran\u00e7ais", "code": "fra", "image": "fr.png" }, 
    { "name": "Italiano", "code": "it", "image": "it.png" }, 
    { "name": "Nederlands", "code": "nl", "image": "nl.png" }, 
    { "name": "Portugu\u00eas", "code": "pt", "image": "br.png" },
    {"name":"russian","code":"ru"},
    {"name":"japan","code":"jp"}
];

countries.forEach(function (country) {  
    readJson(country.code);
});

exports.countries = countries;
exports.saveJsonItem = saveJsonItem;