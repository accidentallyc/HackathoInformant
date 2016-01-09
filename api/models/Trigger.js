/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
   attributes: {
      title: {
         type: 'string'
      },
      expression: {
         type: 'string'
      },
      smsReceivers : {
         type: 'string'
      },
      smsContent : {
         type: 'string'
      },
      emailReceivers :{
         type: 'string'
      },

      emailContent : {
         type: 'string'
      },

      emailSubject: {
         type: 'string'
      },

      doSms:{
         type:'string'
      },
      doEmail:{
         type:'string'
      },
      doCall:{
         type:'string'
      }
   }
};
