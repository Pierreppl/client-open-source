const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
   publicPath: '',
   configureWebpack: config => {
      if(process.env.NODE_ENV === 'production') {
         config.plugins.push(
            new JavaScriptObfuscator({
               compact: true,
               controlFlowFlattening: true,
               controlFlowFlatteningThreshold: 0.75,
               deadCodeInjection: true,
               deadCodeInjectionThreshold: 0.4,
               debugProtection: false,
               debugProtectionInterval: false,
               disableConsoleOutput: true,
               identifierNamesGenerator: 'hexadecimal',
               log: false,
               renameGlobals: false,
               rotateStringArray: true,
               selfDefending: false,
               stringArray: true,
               stringArrayEncoding: 'base64',
               stringArrayThreshold: 0.75,
               transformObjectKeys: true,
               unicodeEscapeSequence: false
            })
         );
         config.devtool = false;
      }
   }
};
