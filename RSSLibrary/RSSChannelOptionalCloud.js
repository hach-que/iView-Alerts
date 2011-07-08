 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSChannelOptionalCloud.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
var RSSChannelOptionalCloud = Class.create({
  
  initialize: function(xmlDoc){
    this.RSSUtils = new RSSUtils();
    this.cloudNode = this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'cloud', 0);    
    this.domain = this.RSSUtils.getXMLNodeAttributeByName(this.cloudNode, 'domain');
    this.port = this.RSSUtils.getXMLNodeAttributeByName(this.cloudNode, 'port');
    this.path = this.RSSUtils.getXMLNodeAttributeByName(this.cloudNode, 'path');
    this.registerProcedure = this.RSSUtils.getXMLNodeAttributeByName(this.cloudNode, 'registerProcedure');
    this.protocol = this.RSSUtils.getXMLNodeAttributeByName(this.cloudNode, 'protocol');    
  },
  
  getCloudNode: function(){
    return this.cloudNode;
  },
  
  getDomain: function(){
    return this.RSSUtils.trim(this.domain);
  },
  
  getPort: function(){
    return this.RSSUtils.trim(this.port);
  },
  
  getPath: function(){
    return this.RSSUtils.trim(this.path);
  },
  
  getRegisterProcedure: function(){
    return this.RSSUtils.trim(this.registerProcedure);
  },
  
  getProtocol: function(){
    return this.RSSUtils.trim(this.protocol);
  },
  
  print: function(html){
    var newLine = '\n';
    var toPrint = '';
    if(html) newLine = '<br>';
    
    toPrint += 'Cloud:' + newLine;
    toPrint += '-- Domain: ' + this.getDomain() + newLine;
    toPrint += '-- Port: ' + this.getPort() + newLine;
    toPrint += '-- Path: ' + this.getPath() + newLine;
    toPrint += '-- RegisterProcedure: ' + this.getRegisterProcedure() + newLine;
    toPrint += '-- Protocol: ' + this.getProtocol() + newLine;
    
    return toPrint;
  }
  
});