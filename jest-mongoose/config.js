'use strict';

const config = (function () {
   let config;
   try {
      config = require(`./config/${process.env.NODE_ENV || 'default'}`);
   } catch (e) {
      config = null;
   }
   console.log(`NODE_ENV=${process.env.NODE_ENV}. Properties:\
   ${JSON.stringify(config)}`);
   return config;
})()

module.exports = {
   config
}