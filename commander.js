var program = require('commander');
//Problème : comment rendre "séquentiel"?

var init = function(callback) {
    program.prompt('name: ', function(name){
        program.prompt('Age: ', Number, function(age){
         callback(name, age);
        });
    });
}
init(function(name, age) {
    console.log("Init done: "+name+", "+age);
});

