var cb = new Codebird;
cb.setConsumerKey("s75bp2rPR15pzp8wQFIuul24U", "aYaHZQBCvDXD3kx9svd5WGLKLUuRPqyvuKckGY0iAZ9SgnYSFF");

var oauth_token = localStorage.getItem("oauth_token");
var oauth_token_secret = localStorage.getItem("oauth_token_secret");
var last_search = localStorage.getItem("last_search");


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var url_query = getParameterByName('q');
console.log(url_query);

var feed_vue = new Vue({
        el: '#feed', 
        data: {
          tweets: []
        }
    });




function readyUp() {

    if (url_query) {
        $('#search_box').val(url_query);
    }
    else if (!last_search) {
        $('#search_box').val('animals');
    }
    else {
        $('#search_box').val(last_search);
    }

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

function getActualTweetID(status) {
    if (status.retweeted_status) {
        return status.retweeted_status.id_str;
    }
    return status.id_str;
}

function searchTwitter() {
    localStorage.setItem("last_search", $('#search_box').val());
    params = {q: $('#search_box').val(), count: 100, lang: 'en', result_type: 'mixed'}
    cb.__call(
        "search_tweets",
        params,
        function (response) {var statuses = response.statuses;

            var temp_tweets = [];

            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                var image = (status.entities.media) ? status.entities.media[0].media_url : null;
                var tweetID = getActualTweetID(status);
                console.log(status);
                temp_tweets.push({displayName: status.user.name, text: status.text, img:status.user.profile_image_url, id: tweetID, media: image});
            }
            feed_vue.tweets = temp_tweets;

        }, true);
}

function searchOnlyText() {
    localStorage.setItem("last_search", $('#search_box').val());
    params = {q: $('#search_box').val(), count: 100, include_entities: false, lang: 'en'};
    cb.__call(
        "search_tweets",
        params,
        function (response) {var statuses = response.statuses;

            var temp_tweets = [];

            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                var image = null;
                var tweetID = getActualTweetID(status);
                temp_tweets.push({displayName: status.user.name, text: status.text, img:status.user.profile_image_url, id: tweetID, media: image});
            }
            feed_vue.tweets = temp_tweets;

        }, true);
}

function searchOnlyPictures() {
    localStorage.setItem("last_search", $('#search_box').val());
    params = {q: $('#search_box').val(), count: 100, include_entities: true};
    cb.__call(
        "search_tweets",
        params,
        function (response) {var statuses = response.statuses;

            var temp_tweets = [];

            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                var image = (status.entities.media) ? status.entities.media[0].media_url : null;
                var tweetID = getActualTweetID(status);

                if (image){
                    temp_tweets.push({displayName: status.user.name, text: status.text, img:status.user.profile_image_url, id: tweetID, media: image});
                }
            }
            feed_vue.tweets = temp_tweets;

        }, true);
}

function searchRecent() {
    localStorage.setItem("last_search", $('#search_box').val());
    params = {q: $('#search_box').val(), count: 100, result_type: 'recent'};
    cb.__call(
        "search_tweets",
        params,
        function (response) {var statuses = response.statuses;

            var temp_tweets = [];

            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                var image = (status.entities.media) ? status.entities.media[0].media_url : null;
                var tweetID = getActualTweetID(status);
                temp_tweets.push({displayName: status.user.name, text: status.text, img:status.user.profile_image_url, id: tweetID, media: image});
            }
            feed_vue.tweets = temp_tweets;

        }, true);
}

function searchPopular() {
    localStorage.setItem("last_search", $('#search_box').val());
    params = {q: $('#search_box').val(), count: 100, result_type: 'popular'};
    cb.__call(
        "search_tweets",
        params,
        function (response) {var statuses = response.statuses;

            var temp_tweets = [];

            for (var i = 0; i < statuses.length; i++){
                var status = statuses[i];
                var image = (status.entities.media) ? status.entities.media[0].media_url : null;
                var tweetID = getActualTweetID(status);
                temp_tweets.push({displayName: status.user.name, text: status.text, img:status.user.profile_image_url, id: tweetID, media: image});
            }
            feed_vue.tweets = temp_tweets;

        }, true);
}

readyUp();
searchTwitter();