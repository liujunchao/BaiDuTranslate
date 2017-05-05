console.log("node translation");
var fs = require('fs');
var http = require('http');
var qs = require('querystring');   
var countries = require("./languages/moudles/countries/index")
   

function translate(params, callback) {

    var data = qs.stringify(params);
        options = {
            host: 'fanyi.baidu.com',
            port: 80,
            path: '/v2transapi',
            method: 'POST',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };

    var req = http.request(options, function(res) {
        var result = '';

        res.setEncoding('utf8');
        res.on('data', function(data) {
            result += data;
        });
        res.on('end', function() {
            var obj = JSON.parse(result);
            if(obj.trans_result === undefined) {
                console.log("cannot convert from "+params.from+" to "+params.to);
                return ;
            }
           var str = obj.trans_result.data[0].dst;

            str = str.replace(/\"/g, '');
            //str = str.toLowerCase().split(' ').join('_');
            //console.log(str);
            callback(str);
        });
    });

    req.on('error', function(err) {
        console.log(err);
        setTimeout(function() {
            translation(query, callback);
        }, 3000);
    });

    req.write(data);
    req.end(); 
}


function translateAll(key,query) { 

    countries.countries.forEach(function (country) {  
        if(country.code === "en"){
            countries.saveJsonItem(country.code,key,query);
            return ;
        }
       var params = {
            from: 'en',
            to: country.code,
            query: query
        };

        (function (params2) { 
            translate(params2,function (rlt) { 
                console.log(params2.to+" translated!");
                countries.saveJsonItem(params2.to,key,rlt);
            });
        }(params));
    });
};




const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function question() { 
    rl.question('keyword and english description?\n ', function (answer) {
        //var inputs = answer.toLowerCase().split('_');
        var inputs = answer.split('=');
        if(inputs.length!==2){
            console.log("invalid configuration，please retry"); 
        }else{
             translateAll(inputs[0],inputs[1]);
        }
       
        //rl.close();
        setTimeout(function() {
            //console.log("please wait for a second");
            question();
        }, 1000);
    });
}

question();