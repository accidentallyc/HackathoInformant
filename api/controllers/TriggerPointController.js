module.exports = {
   trigger : function(req,res){
      var id = req.params.id
      Trigger
         .findOne({id:id})
         .then( function(trigger){
            var reqParams = req.params.all()
            var regex = /\$(\w+)/g

            function parseVars(txt){
               return txt.replace( regex, function(match, submatch){
                  replacement = reqParams[ submatch ] || wordbank[ submatch ]
                  if (replacement)
                     return replacement
                  else{
                     console.error('Cannot find match for ' + submatch + ' in both request variables and in the wordbank')
                  }
               })
            }


            if (!trigger){
               res.notFound('404: Cannot find trigger with id ' + id )
            }
            else{

               if( !reqParams.content )
                  console.error('Missing content field from request variables')

               var expression = parseVars( trigger.expression )


               var eResult = null
               var status  = null
               if( eResult = eval( expression ) ){
                  msg = new Sms()
                  msg.content    = parseVars( reqParams.content )
                  msg.addReceiver( trigger.receivers )
                  msg.send()

                  console.log(msg)

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
