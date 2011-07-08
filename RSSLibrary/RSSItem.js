 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSItem.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
var RSSItem = Class.create({    
  
  initialize: function(xmlDoc){ 
    this.RSSUtils = new RSSUtils();
    this.itemNode = this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'item', 0);
    this.link = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'link', 0);
    this.title = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'title', 0);
    this.description = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'description', 0);
    
    this.author = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'author', 0);
    this.category = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'category', 0);
    this.categoryDomain = this.RSSUtils.getXMLNodeAttributeByName(this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'category', 0), 'domain');
    this.comments = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'comments', 0);
    this.enclosure = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'enclosure', 0);
    this.guid = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'guid', 0);
    this.guidIsPermaLink = this.RSSUtils.getXMLNodeAttributeByName(this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'guid', 0), 'isPermaLink');
    this.pubDate = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'pubDate', 0);
    this.source = this.RSSUtils.getXMLNodeValueByNameAndPos(xmlDoc, 'source', 0);
    this.mediaThumbnail = this.RSSUtils.getXMLNodeAttributeByName(this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'thumbnail', 0), 'url');
    this.mediaPlayer = this.RSSUtils.getXMLNodeAttributeByName(this.RSSUtils.getXMLNodeByNameAndPos(xmlDoc, 'player', 0), 'url');
  },
  
   setItemNode: function(channelNode){
    this.itemNode = itemNode;
  },
  
  setTitle: function(title){
    this.title = title    
  },
  
  setLink: function(link){
    this.link = link;
  },
  
  setDescription: function(description){
    this.description = description;
  },
  
  setDescription: function(author){
    this.author = author;
  },
  
  getItemNode: function(){
    return this.channelNode;
  },
  
  getTitle: function(){
    return this.RSSUtils.trim(this.title);
  },
  
  getLink: function(){
    return this.RSSUtils.trim(this.link);
  },
  
  getDescription: function(){
    try{
      return this.RSSUtils.trim(this.description);
    }catch (e){
      return this.description;
    }  
  },
  
  getAuthor: function(){
    return this.RSSUtils.trim(this.author);
  },
  
  getCategory: function(){
    return this.RSSUtils.trim(this.category);
  },
  
  getCategoryDomain: function(){
    return this.RSSUtils.trim(this.categoryDomain);
  },
  
  getComments: function(){
    return this.RSSUtils.trim(this.comments);
  },
  
  getEnclosure: function(){
    return this.RSSUtils.trim(this.enclosure);
  },
  
  getGuid: function(){
    return this.RSSUtils.trim(this.guid);
  },
  
  getGuidIsPermaLink: function(){
    return this.RSSUtils.trim(this.guidIsPermaLink);
  },
  
  getPubDate: function(){
    return this.RSSUtils.trim(this.pubDate);
  },
  
  getSource: function(){
    return this.RSSUtils.trim(this.source);
  },
  
  getMediaThumbnail: function(){
    return this.RSSUtils.trim(this.mediaThumbnail);
  },
  
  getMediaPlayer: function(){
    return this.RSSUtils.trim(this.mediaPlayer);
  },
  
  print: function(html){
    var newLine = '\n';
    var toPrint = '';
    if(html) newLine = '<br>';
    
    toPrint += "title:\t" + this.getTitle() + newLine;
    toPrint += "link:\t" + this.getLink() + newLine;    
    toPrint += "author:\t" + this.getAuthor() + newLine;
    toPrint += "category:\t" + this.getCategory() + newLine;
    toPrint += "-- category domain: " + this.getCategoryDomain() + newLine;
    toPrint += "comemnts:\t" + this.getComments() + newLine;
    toPrint += "enclosure:\t" + this.getEnclosure() + newLine;
    toPrint += "guid:\t" + this.getGuid() + newLine;
    toPrint += "-- guid isPermalink:\t" + this.getGuidIsPermaLink() + newLine;
    toPrint += "pubDate:\t" + this.getPubDate() + newLine;
    toPrint += "source:\t" + this.getSource() + newLine + newLine;
    toPrint += this.getDescription()+ "..." + newLine;
    toPrint += newLine + newLine + newLine;
    
    return toPrint;
  }
 
});