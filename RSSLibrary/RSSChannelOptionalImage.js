 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSChannelOptionalImage.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
var RSSChannelOptionalImage = Class.create({
  
  initialize: function(xmlDoc){
    this.RSSUtils = new RSSUtils();
    this.imageNode = this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'image', 0);
    this.url = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'url', 0);
    this.title = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'title', 0);
    this.link = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'link', 0);
    this.width = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'weight', 0);
    this.height = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'height', 0);
    this.description = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'description', 0);
  },
  
  getImageNode: function(){
    return this.imageNode;
  },
  
  getUrl: function(){
    return this.RSSUtils.trim(this.url);
  },
  
  getTitle: function(){
    return this.RSSUtils.trim(this.title);
  },
  
  getLink: function(){
    return this.RSSUtils.trim(this.link);
  },
  
  getWidth: function(){
    return this.RSSUtils.trim(this.width);
  },
  
  getHeight: function(){
    return this.RSSUtils.trim(this.height);
  },
  
  getDescription: function(){
    return this.RSSUtils.trim(this.description);
  },
  
  print: function(html){
    var newLine = '\n';
    var toPrint = '';
    if(html) newLine = '<br>';
    
    toPrint += 'Image:' + newLine;
    toPrint += '-- url: ' + this.getUrl() + newLine;
    toPrint += '-- link: ' + this.getLink() + newLine;
    toPrint += '-- title: ' + this.getTitle() + newLine;
    toPrint += '-- width: ' + this.getWidth() + newLine;
    toPrint += '-- height: ' + this.getHeight() + newLine;
    toPrint += '-- description: ' + this.getDescription() + newLine;
    
    return toPrint;
  }
  
});