 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSChannelOptionalTextInput.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
var RSSChannelOptionalTextInput = Class.create({
  
  initialize: function(xmlDoc){
    this.RSSUtils = new RSSUtils();
    this.textInputNode = this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'textInput', 0);
    this.title = this.RSSUtils.getXMLNodeValueByNameAndPos(this.textInputNode, 'title', 0);
    this.description = this.RSSUtils.getXMLNodeValueByNameAndPos(this.textInputNode, 'description', 0);
    this.name = this.RSSUtils.getXMLNodeValueByNameAndPos(this.textInputNode, 'name', 0);
    this.link = this.RSSUtils.getXMLNodeValueByNameAndPos(this.textInputNode, 'link', 0); 
  },
  
  getTextInputNode: function(){
    return this.textInpuNode;
  },
  
  getTitle: function(){
    return this.RSSUtils.trim(this.title);
  },
  
  getDescription: function(){
    return this.RSSUtils.trim(this.description);
  },
  
  getName: function(){
    return this.RSSUtils.trim(this.name);
  },
  
  getLink: function(){
    return this.RSSUtils.trim(this.link);
  },
  
  print: function(html){
    var newLine = '\n';
    var toPrint = '';
    if(html) newLine = '<br>';
    
    toPrint += 'TextInput:' + newLine;
    toPrint += '-- title: ' + this.getTitle() + newLine;
    toPrint += '-- description: ' + this.getDescription() + newLine;
    toPrint += '-- name: ' + this.getName() + newLine;
    toPrint += '-- link: ' + this.getLink() + newLine;
    
    return toPrint;
  }
});