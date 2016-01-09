module.exports = {
   trigger : function(req,res){
      console.log( "testasd",req.method )
      res.json('{1:2w}')
   }
}
