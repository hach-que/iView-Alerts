 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSChannel.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var RSSChannel = Class.create({   
  initialize: function(xmlDoc){
    this.RSSUtils = new RSSUtils();
    this.channelNode = this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'channel', 0);
    this.link = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'link', 0);
    this.title = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'title', 0);
    this.description = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'description', 0);
  },	  
  
  getChannelNode: function(channelNode){
    return this.channelNode;
  },
  
  getTitle: function(channelNode){
    return this.RSSUtils.trim(this.title);
  },
  
  getLink: function(channelNode){
    return this.RSSUtils.trim(this.link);
  },
  
  getDescription: function(channelNode){
    return this.RSSUtils.trim(this.description);
  },
  
  print: function(html){
    var newLine = '\n';
    var toPrint = '';
    if(html) newLine = '<br>';
       
    toPrint += 'TITLE: ' + this.getTitle() + newLine;   
    toPrint += 'LINK: ' + this.getLink() + newLine;   
    toPrint += 'DESCRIPTION: ' + this.getDescription() + newLine;
    toPrint += newLine;
    
    return toPrint;
  }  
  
});