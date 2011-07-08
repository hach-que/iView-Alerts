 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSChannelOptional.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var RSSChannelOptional = Class.create({

  initialize: function(xmlDoc){
    this.RSSUtils = new RSSUtils();
    this.channelNode = this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'channel', 0);
    this.language = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'language', 0);
    this.copyright = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'copyright', 0);
    this.managingEditor = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'managingEditor', 0);
    this.webMaster = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'webMaster', 0);
    this.pubDate = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'pubDate', 0);
    this.lastBuildDate = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'lastBuildDate', 0);
    this.category = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'category', 0);
    this.generator = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'generator', 0);
    this.docs = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'docs', 0);
    //this.cloud = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'cloud', 0);
    this.cloud = new RSSChannelOptionalCloud(this.channelNode);
    this.ttl = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'ttl', 0);
    //this.image = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'image', 0);
    this.image = new RSSChannelOptionalImage(this.channelNode);
    this.rating = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'rating', 0);
    //this.textInput = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'textInput', 0);
    this.textInput = new RSSChannelOptionalTextInput(this.channelNode);
    this.skipHours = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'skipHours', 0);
    this.skipDays  = this.RSSUtils.getXMLNodeValueByNameAndPos(this.channelNode, 'skipDays', 0);
  },
  
  getLanguage: function(){
    return this.RSSUtils.trim(this.language);
  },
  
  getCopyright: function(){
    return this.RSSUtils.trim(this.copyright);
  },
  
  getManagingEditor: function(){
    return this.RSSUtils.trim(this.managingEditor);
  },
  
  getWebMaster: function(){
    return this.RSSUtils.trim(this.webMaster);
  },
  
  getPubDate: function(){
    return this.RSSUtils.trim(this.pubDate);
  },
  
  getLastBuildDate: function(){
    return this.RSSUtils.trim(this.lastBuildDate);
  },
  
  getCategory: function(){
    return this.RSSUtils.trim(this.category);
  },
  
  getGenerator: function(){
    return this.RSSUtils.trim(this.generator);
  },
  
  getDocs: function(){
    return this.RSSUtils.trim(this.docs);
  },
  
  getCloud: function(){
    return this.cloud;
  },
  
  getTtl: function(){
    return this.RSSUtils.trim(this.ttl);
  },
  
  getImage: function(){
    return this.image;
  },
  
  getRating: function(){
    return this.RSSUtils.trim(this.rating);
  },
  
  getTextInput: function(){
    return this.textInput;
  },
  
  getSkipHours: function(){
    return this.RSSUtils.trim(this.skipHours);
  },
  
  getSkipDays: function(){
    return this.RSSUtils.trim(this.skipDays);
  },
  
   print: function(html){
    var newLine = '\n';
    var toPrint = '';
    if(html) newLine = '<br>';
    
    toPrint += 'Language: ' + this.getLanguage() + newLine;
    toPrint += 'Copyright: ' + this.getCopyright() + newLine;
    toPrint += 'ManagingEditor: ' + this.getManagingEditor() + newLine;
    toPrint += 'WebMaster: ' + this.getWebMaster() + newLine;
    toPrint += 'PubDate: ' + this.getPubDate() + newLine;
    toPrint += 'LastBuildDate: ' + this.getLastBuildDate() + newLine;
    toPrint += 'Category: ' + this.getCategory() + newLine;  
    toPrint += 'Generator: ' + this.getGenerator() + newLine;
    toPrint += 'Docs: ' + this.getDocs() + newLine;    
    toPrint += this.getCloud().print(true);      
    toPrint += 'Ttl: ' + this.getTtl() + newLine;  
    toPrint += this.getImage().print(true);      
    toPrint += 'Rating: ' + this.getRating() + newLine;  
    toPrint +=  this.getTextInput().print(true);     
    toPrint += 'SkipHours: ' + this.getSkipHours() + newLine;
    toPrint += 'SkipDays: ' + this.getSkipDays() + newLine;
    
    return toPrint;
  }  
          
});