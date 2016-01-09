module.exports = function (){
   // FROM http://www.5ymail.com/en_US/menu/http-api-5ymail.html
   this.endpoint  = 'http://www.5ymail.com/sendapi.php'
   this.subject   = 'Alert from Informant'
   function addReceiver( toEmail ){
      this.receiver.push(toEmail)
   }

   function send (){
      console.log('entering send')
      if (this.receiver.length == 0)
         console.error('SMS has no receiver')

      if (!this.content)
         console.error('SMS has no content')

      params =
         {
            pass     : "iauiduaiywyei28772_",           // Password to account
            fremail  : "notification@informant.com",   // Sender mail
            rcemail  : this.receiver[0],               // Email:To
            name     : "Informant",                    // Email:Name <from>
            sj       : this.subject,                   // Email:Subject
            content  : this.content,
            user     : "accidentallyc"                  // Username to account
         }

      request = require('request')
      
      request.get( {url:this.endpoint , form: params}, function(a,b,body){
         console.log("Response to email",body)
      })
   }

   this.receiver = []
   this.content = ''
   this.addReceiver = addReceiver
   this.send = send

}
