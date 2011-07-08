 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSUtils.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
var RSSUtils = Class.create({
  initialize: function(){
  },
    
  trim: function(str){      
    if(str){  
      str = str.replace(/^\s+/, '');
      for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          str = str.substring(0, i + 1);
          break;
       }
      }
    }   
    return str;   
  },
  
  getXMLNodeByName: function(xmlDoc, nodeName){
    return xmlDoc.getElementsByTagName(nodeName);
  },
  
  getXMLNodeByNameAndPos: function(xmlDoc, nodeName, pos){
    return xmlDoc.getElementsByTagName(nodeName)[0];
    
  },
  
  getXMLNodeValueByNameAndPos: function(xmlDoc, nodeName, pos){
    try{
      return xmlDoc.getElementsByTagName(nodeName)[0].firstChild.nodeValue;
    }catch (e){
      return "";
    }      
  },
  
  getXMLNodeValue: function(node){
    try{
      return node.firstChild.nodeValue;
    }catch(e){
      return "";
    }
  },
  
  getXMLNodeAttributeByName: function(xmlNode, attrName){
    try{
      if(xmlNode!=undefined)
        if(xmlNode.getAttribute(attrName)!=undefined)
          return xmlNode.getAttribute(attrName);
      return "";  
    }catch (e){
      return "";
    }  
  }
   
});