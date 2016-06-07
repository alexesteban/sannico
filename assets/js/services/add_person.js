app.service('person', function(){
  var person;
    this.setPerson= function(p){
        person = p;
        return person;
    };
    this.getPerson = function(){
        if (person) {
          return person;
        }else{
          return '';
        }
    };
});
