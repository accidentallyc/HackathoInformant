module.exports = function(){
   this.endpoint = "https://post.chikka.com/smsapi/request"
   this.clientID = "f4d1063af63a41740eaf0ab80ad134d5873cd0cec671a3c3a0748acf91cfae64"
   this.secretKey = "1d404bd8edf2968a7928c20767a085d79012c8e780f82f6f5e745cb2e5c7c0fa"

   function getMessageId( ) {
      return "ccc81279fcc048d1a6fcc52ed4c13255"
   }


   function addReceiver( mobileNum ){
      this.receiver.push( mobileNum )
   }

   function send (){
      console.log('entering send')
      if (this.receiver.length == 0)
         console.error('SMS has no receiver')

      if (!this.content)
         console.error('SMS has no content')

      params =
         {
            message_type: "SEND",
            shortcode   : 29290348,
            message_id  : getMessageId(),
            message     : this.content,
            client_id   : this.clientID,
            secret_key  : this.secretKey,
            mobile_number: this.receiver[0]
         }

      request = require('request')
      console.warn("Warning this section has been commented cause neil brought his phone")
      // request.post( {url:this.endpoint , form: params}, function(res){
      //    console.log("res reilt",res.body)
      // })
   }

   this._getMessageId = getMessageId

   this.receiver = []
   this.content = ''
   this.addReceiver = addReceiver
   this.send = send

}
