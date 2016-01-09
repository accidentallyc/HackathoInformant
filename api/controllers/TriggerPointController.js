module.exports = {
   trigger : function(req,res){
      Trigger
         .find({id:req.params.id})
         .then( function(trigger){
            trigger.expression
            res.json(trigger)
         })
         .catch( function(err){
            res.json(trigger)
         })
   }
}
