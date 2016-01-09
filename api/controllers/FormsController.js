module.exports = {
   showNewTriggerForm : function(req,res){
      console.log( "testasd",req.method )
      if( req.method == 'POST')
      {
         Trigger.create({
            "title"       : req.param('title'),
            "expression"  : req.param('expression'),
            "receivers"   : req.param('receivers')
         }).exec( function(err,trigger){
            console.log(err||res)
            if(err){
               res.view('form-trigger.jade',{err:err})
            }else{
               res.view('form-trigger.jade',{success:true})
            }
         })
      }
      else
      {
         res.view('form-trigger.jade')
      }
   },

}
