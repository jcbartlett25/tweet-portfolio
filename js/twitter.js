var cb = new Codebird;
cb.setConsumerKey("s75bp2rPR15pzp8wQFIuul24U", "aYaHZQBCvDXD3kx9svd5WGLKLUuRPqyvuKckGY0iAZ9SgnYSFF");

var oauth_token = localStorage.getItem("oauth_token");
var oauth_token_secret = localStorage.getItem("oauth_token_secret");

var feed_vue = new Vue({
        el: '#feed', 
        data: {
          tweets: []
        }
    });




function readyUp() {
    if (oauth_token && oauth_token_secret) {
          cb.setToken(oauth_token, oauth_token_secret);
          console.log('cached');
    } else {
        // gets a request token
        cb.__call(
            "oauth_requestToken",
            {oauth_callback: "oob"},
            function (reply,rate,err) {
                if (err) {
                    console.log("error response or timeout exceeded" + err.error);
                }
                if (reply) {
                    console.log(reply);
                    
                    // stores it in local memory
                    cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    localStorage.setItem("oauth_token", reply.oauth_token);
                    localStorage.setItem("oauth_token_secret", reply.oauth_token_secret);

                    // gets the authorize screen URL
                    // cb.__call(
                    //     "oauth_authorize",
                    //     {},
                    //     function (auth_url) {
                    //         console.log(auth_url)
                    //         window.codebird_auth = window.open(auth_url);
                    //     }
                    // );

                }
            }
        );
    }
    
}

function searchTwitter() {
    params = {q: $('#search_box').val(), count: 30}
    cb.__call(
        "search_tweets",
        params,
        function (response) {var statuses = response.statuses;

            var temp_tweets = [];

            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                //console.log(status);
                var image = (status.entities.media) ? status.entities.media[0].media_url : null;
                temp_tweets.push({displayName: status.user.name, text: status.text, img:status.user.profile_image_url, id: status.id_str, media: image});
            }
            feed_vue.tweets = temp_tweets;
            console.log(temp_tweets);
        }, true);
}

readyUp();
searchTwitter();