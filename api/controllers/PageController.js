module.exports = {
   dashboard : function(req,res){
      Trigger
         .find()
         .then( function( triggers ){
            data = {
               triggers : triggers
            }
            res.view('homepage.jade', data)
         })
   },

}
