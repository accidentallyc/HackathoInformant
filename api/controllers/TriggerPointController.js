module.exports = {
   trigger : function(req,res){
      var id = req.params.id
      Trigger
         .findOne({id:id})
         .then( function(trigger){
            var reqParams = req.params.all()
            if (!trigger){
               res.notFound('404: Cannot find trigger with id ' + id )
            }
            else{
               var regex = /\$(\w+)/g
               var expression = trigger
                  .expression
                  .replace( regex, function(match, submatch){
                     replacement = reqParams[ submatch ] || wordbank[ submatch ]
                     if (replacement)
                        return replacement
                     else
                        throw new Error('Cannot find match for ' + submatch + ' in both request variables and in the wordbank')

                  })

               var eResult = null
               var status  = null
               if( eResult = eval( expression ) ){
                  msg = new Sms()
                  msg.content = reqParams.message
                  msg.send()
                  
                  status = 'Passed condition. sending.'
               } else{
                  status = 'Failed condition. Not sending.'
               }

               // Return result
               res.json({
                  status : status,
                  parsed : expression,
                  result : eResult
               })
            }
         })
         .catch( function(err){
            res.json(err)
         })
   }
}
