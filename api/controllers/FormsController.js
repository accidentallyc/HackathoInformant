module.exports = {
   showNewTriggerForm : function(req,res){
      if( req.method == 'POST')
      {
         Trigger.create({
            "title"       : req.param('title'),
            "expression"  : req.param('expression'),
            "smsReceivers"  : req.param('smsReceivers'),
            "smsContent"    : req.param('smsContent'),
            "emailReceivers"  : req.param('emailReceivers'),
            "emailContent"    : req.param('emailContent'),
            "emailSubject"    : req.param('emailSubject')
         }).then( function(trigger){
            console.log("triggerng?")
            res.redirect('/trigger/' + trigger.id + '/edit')
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
         res.view('form-trigger.jade',{action:'/trigger/new',trigger: {}})
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
                trigger.smsReceivers   = req.param('smsReceivers')
                trigger.smsContent     = req.param('smsContent')
                trigger.emailReceivers   = req.param('emailReceivers')
                trigger.emailContent     = req.param('emailContent')
                trigger.emailSubject     = req.param('emailSubject')
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
