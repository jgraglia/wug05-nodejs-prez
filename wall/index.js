$(document).ready(function() {
      "use strict";
      
       var socket = io.connect('http://localhost:8081');
       socket.on('news', function (data) {
        $("#status").append("<p>"+new Date()+"::"+data.hello+"</p>");
        //console.log(data);
        //socket.emit('my other event', { my: 'data' });
      });
        socket.on('tweet', function (tweet) {
            var tweetElt = $("<div>").addClass("tweet");
            $("<span>").addClass("label").append(tweet.created_at).appendTo(tweetElt);
            tweetElt.append(" :: ");
            $("<span>").addClass("label label-info").append(tweet.user).appendTo(tweetElt);
            tweetElt.append(" :: ");
            $("<span>").addClass("label").append(tweet.text).appendTo(tweetElt);
            tweetElt.append(" :: ");
            $("<span>").addClass("label-important").append(tweet.followers_count+" followers").appendTo(tweetElt);
            
            $("#tweets").append(tweetElt);
            //console.log(data);
            //socket.emit('my other event', { my: 'data' });
      });
});
