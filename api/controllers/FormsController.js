module.exports = {
   showNewTriggerForm : function(req,res){
      if( req.method == 'POST')
      {
         Trigger.create({
            "title"       : req.param('title'),
            "expression"  : req.param('expression'),
            "receivers"   : req.param('receivers'),
            "content"   : req.param('content')
         }).then( function(trigger){
            res.view('form-trigger.jade',{
               action:'/trigger/new',
               trigger: {},
               success:true
            })
         })
         .catch( function(err){
            console.log(err)
            res.view('form-trigger.jade',{
                     action:'/trigger/new',
                     trigger:{},
                     err:err})
         })
      }
      else
      {
         res.view('form-trigger.jade',{trigger: {}})
      }
   },

   showEditTriggerForm: function(req,res){
      if( req.method == 'POST')
      {
         Trigger
            .findOne({id:req.params.id})
            .then( function(trigger){
                trigger.title       = req.param('title')
                trigger.expression  = req.param('expression')
                trigger.receivers   = req.param('receivers')
                trigger.content     = req.param('content')
                trigger.save()

                res.view('form-trigger.jade',{
                   action:'/trigger/'+req.params.id+'/edit',
                  trigger: trigger,
                  success:true
               })
            }).catch( function(err){
               console.log(err)
               res.view('form-trigger.jade',{err:err})
            })
      }
      else
      {
         Trigger
            .findOne({id:req.params.id})
            .then( function(trigger){
               console.log("trigger here is",trigger)
               res.view('form-trigger.jade',{
                  action:'/trigger/'+req.params.id+'/edit',
                  trigger: trigger,
                  success:true
               })
            })
            .catch( function(err){
               console.log(err)
               res.view('form-trigger.jade',{err:err})
            })

      }
   }

}
