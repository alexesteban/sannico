app.service('auth', function(){
  var auth;
    this.setAuth= function(a){
        auth = a;
        return auth;
    };
    this.getAuth = function(){
        if (auth) {
          return auth;
        }else{
          return '';
        }
    };
});
