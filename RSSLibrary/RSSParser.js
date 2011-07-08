 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * 
 * RSSLibrary Javascript framework, version 0.1
 * RSSParser.js - version 0.1                   
 * 
 * 17th May, 2008 - Omar Adobati
 *
 * RSSLibrary is freely distributable under the terms of Apache-2 License.
 * For details, see the RSSLibrary web site: http://labs.adobati.it/jsRSS
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
  var RSSParser = Class.create({
	initialize: function(rss){	  
	  this.rssUrl = rss;	     
	  var channel = null;
      var channelOptional = null;
	  var items = new Array();
	  var ar = new Ajax.Request(rss, {
	    asynchronous: false,
	    onSuccess: function(transport){
          var xml = transport.responseXML;
          if (xml == null)
          {
            // Try manual parse.
            var p = new DOMParser();
            xml = p.parseFromString(transport.responseText, "text/xml");
          }
          channel = new RSSChannel(xml);
          channelOptional = new RSSChannelOptional(xml);
                                        
          var tmpitems = channel.getChannelNode().getElementsByTagName('item').length;	 
          for(var i=0; i<tmpitems; i++){
		    var item = new RSSItem(xml.getElementsByTagName('item')[i]); 
		    items.push(item);		    
		  }
                                                    
	    },
        onError: function(transport){
          alert(transport);
        }
	  });
      this.rssUtils = new RSSUtils();
	  this.channel = channel;
      this.channelOptional = channelOptional;	 
	  this.items = items; 
	},
	
    getRssUtils: function(){   
      return this.rssUtils;
    },
  		
	getChannel: function(){	  
      return this.channel;
	},
  
    getChannelOptional: function(){   
      return this.channelOptional;
    },
  
    getItems: function(){   
      return this.items;
    },
    
    getItem: function(ndx){   
      return this.items[ndx];
    }
  });