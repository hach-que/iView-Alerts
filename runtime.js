/*
 * Name:            Runtime
 * Author:          James Rhodes
 * License:         MIT License
 *
 * Description:
 *  Defines the class for retrieving new ABC iView episodes and alerting
 *  the user to their presence.
 *
 */

Runtime = Class.create({

    // URL to recent episodes.
    URL: "http://tviview.abc.net.au/iview/rss/recent.xml",

    // <summary>
    // Initializes the runtime.
    // </summary>
    initialize: function()
    {
        // Initalize the RSS parser.
        this.parser = null;
        
        // Set static variables.
        Runtime.URL = Runtime.prototype.URL;
        
        // Start the update cycle.
        this.update();
    },
    
    // <summary>
    // Updates the RSS information and then informs the user
    // of new episodes.
    // </summary>
    update: function()
    {
        // Update the RSS information.
        var me = this;
        this.parser = new RSSParser(Runtime.URL);
        
        // Loop through all of the items.
        this.items = this.parser.getItems();
        this.handle();
        
        // Start the next cycle in 2 minutes time.
        window.setTimeout(function ()
        {
            me.update();
        }, 1000 * 60 * 2);
    },
    
    // <summary>
    // Handles the creation of all of the notification windows.
    // </summary>
    handle: function()
    {
        // Determine how many items to show.
        var t = this.items.slice(0);
        var me = this;
        var mS = window.Storage.getRawItem("muted-shows");
        var kS = window.Storage.getRawItem("known-shows");
        if (mS == null) mS = [];
        if (kS == null) kS = [];
        this.queue = [];
        t.forEach(function(i)
        {
            // Search for title in muted shows.
            var found = false;
            mS.forEach(function(a)
            {
                if (i.title.substring(0, a.length + 8) == a + " Episode")
                    found = true;
            });
            
            // Search for title in known episodes.
            kS.forEach(function(a)
            {
                if (i.title == a)
                    found = true;
            });
            
            // Add if not found.
            if (!found)
                me.queue.push(i);
        });
        
        // Create a notification for each.
        var l = this.queue.length;
        for (var n = 0; n < l; n += 1)
        {
            var notification = webkitNotifications.createHTMLNotification(
                "notification.html"
            );
            notification.show();
            
            // Each of the notification documents will request information
            // via the getNotification function, which will pop the latest
            // notification off the list.
        }
    },
    
    // <summary>
    // Returns the HTML that a notification document should embed in itself.
    // </summary>
    getNotification: function()
    {
        var p = this.queue.pop();
        this.knowShow(p.title);
        
        // Check to see if it is episodic content.
        if (/ Episode /g.exec(p.title) != null)
        {
            // Episodic.
            var ss = /^.+ Episode/g.exec(p.title)[0];
            var nn = /Episode [0-9]+ /g.exec(p.title)[0];
            var ee = /Episode .+/g.exec(p.title)[0];
            return {
                thumbnail: p.mediaThumbnail,
                player: p.mediaPlayer,
                series: ss.substring(0, ss.length - 8),
                number: nn.substring(8).trim(),
                title: ee.substring(8 + nn.substring(8).trim().length + 1).trim(),
                description: p.description,
            };
        }
        else
        {
            // One-off show / news.
            return {
                thumbnail: p.mediaThumbnail,
                player: p.mediaPlayer,
                series: null,
                number: null,
                title: p.title,
                description: p.description,
            };
        }
    },
    
    // <summary>
    // Checks all of the open notification windows to see if they need closing.
    // </summary>
    checkNotifications: function()
    {
        var me = this;
        chrome.extension.getViews({type:"notification"}).forEach(function(win) {
            if (win.shouldMute)
            {
                // Grab the name of the series from the document.
                me.muteShow(win.document.getElementById("series").innerText.trim());
            }
            else if (win.shouldLater)
            {
                // Grab the data about the show.
                me.laterShow(win.data);
            }
            if (win.shouldClose)
                win.close();
        });
    },
    
    // <summary>
    // Returns a list of saved programs.
    // </summary>
    getSavedPrograms: function()
    {
        var lS = window.Storage.getRawItem("later-shows");
        if (lS == null) lS = [];
        return lS;
    },
    
    // <summary>
    // Removes a saved program from the list.
    // </summary>
    removeSavedProgram: function(show)
    {
        var lS = window.Storage.getRawItem("later-shows");
        if (lS == null) lS = [];
        for (i = 0; i < lS.length; i += 1)
        {
            if (lS[i].thumbnail == show.thumbnail &&
                lS[i].player == show.player &&
                lS[i].series == show.series &&
                lS[i].number == show.number &&
                lS[i].title == show.title &&
                lS[i].description == show.description)
            {
                lS.splice(i, 1);
                i -= 1;
            }
        }
        window.Storage.setRawItem("later-shows", lS);
    },
    
    // <summary>
    // Adds a saved program to the list.
    // </summary>
    addSavedProgram: function(show)
    {
        this.laterShow(show);
    },
    
    // <summary>
    // Returns information about whether or not the current page is a program.  This
    // function returns immediately as it uses asynchronous APIs.
    // </summary>
    getProgram: function(callback)
    {
        // Since the tab / window functions are asynchronous, we have to do this all
        // via callbacks.
        chrome.windows.getLastFocused(function(w)
        {
            chrome.tabs.getSelected(w.id, function(t)
            {
                // Parse the URL and return whether it is a program or not.
                var start1 = "http://www.abc.net.au/iview/#/view/";
                var start2 = "http://www.abc.net.au/iview/#/program/";
                if (t.url.substring(0, start1.length) == start1 || t.url.substring(0, start2.length) == start2)
                {
                    // We are a program, also create a save() function.
                    callback({
                        isProgram: true,
                        saveProgram: function()
                        {
                            // We can't yet dynamically get the name of a show based
                            // on the page, so we need to ask the user what they want
                            // to call this show.
                            var name = prompt("iView Alerts can't automatically retrieve the show name for you when adding from a page.  What is the name of this show / episode?", "Unknown Episode");
                            
                            // If the user actually entered something...
                            if (name != null)
                            {
                                chrome.extension.getBackgroundPage().Runtime.addSavedProgram({
                                    thumbnail: null,
                                    player: t.url,
                                    series: null,
                                    number: null,
                                    title: name,
                                    description: null,
                                });
                            }
                        }
                    });
                }
                else
                {
                    // We are not a program.
                    callback({
                        isProgram: false,
                        saveProgram: null
                    });
                }
            });
        });
    },
    
    // <summary>
    // Mutes the specified series.
    // </summary>
    muteShow: function(show)
    {
        var mutedShows = window.Storage.getRawItem("muted-shows");
        if (mutedShows == null) mutedShows = [];
        mutedShows.push(show);
        window.Storage.setRawItem("muted-shows", mutedShows);
    },
    
    // <summary>
    // Stores the show for later.
    // </summary>
    laterShow: function(show)
    {
        var laterShows = window.Storage.getRawItem("later-shows");
        if (laterShows == null) laterShows = [];
        laterShows.push(show);
        window.Storage.setRawItem("later-shows", laterShows);
    },
    
    // <summary>
    // Marks the specified episode as known to the user.
    // </summary>
    knowShow: function(show)
    {
        var knownShows = window.Storage.getRawItem("known-shows");
        if (knownShows == null) knownShows = [];
        knownShows.push(show);
        window.Storage.setRawItem("known-shows", knownShows);
    }
});