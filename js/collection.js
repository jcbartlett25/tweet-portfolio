var cb = new Codebird;
    cb.setConsumerKey("iJQ8FLDCqzypnRjGWq1uyeJV5", "R2CMY74KC1ehtRJTLgvSSE5jPyYqGTZVKgwxuUZHz7S0P2oJa4");
    cb.setToken("938214222042943488-6HPeVLlBXDVmmPUHipaWVzIIhLUYkKR", "lxMZ8Pd7rNVwgVORVJkDVXvTXqmafY1WPxVArRl0Azg63");

$(document).ready(function(){
	/* datepicker */
	
    cb.__call(
        "collections_list",
        {
            //name: 'FeinerFans',
            user_id: '938214222042943488'
            // screen_name: 'Portfolio'
        },
        function (reply, rate, err) {
            for (var i = 0; i < reply.response.results.length; i ++) {
                var timeline_id = reply.response.results[i].timeline_id;
                //console.log(timeline_id);
                var each_collection = reply.objects.timelines[timeline_id];
                var page = "#pageSubmenu" + i;
                var subpage = "pageSubmenu" + i;
                var name = each_collection.name;
                each_collection["page"] = "#pageSubmenu" + i;
                each_collection["subpage"] = "pageSubmenu" + i;
                each_collection["collection_id"] = timeline_id;
                console.log(each_collection.name);
                var collections = ich.favorites(each_collection);
                // console.log(collections);
                $("#favorites").append(collections);
                $("#folder_name").append("<option value ="+ timeline_id +">"+each_collection.name+"</option>"); 
                //console.log(timeline_id);
                console.log(timeline_id);
                console.log(subpage);
                addtweets(timeline_id, subpage);
                
            }
                
        }
    );

    $(document).on("click", ".delete_icon", function(){
        
        var collection_id = $(this).closest('li').attr('id');
        //var collection_id = parent.attr('id');
        console.log(collection_id);
        cb.__call(
            "collections_destroy",
            {
                //name: 'FeinerFans',
                id : collection_id
                // screen_name: 'Portfolio'
            },
            function(reply, rate, err) {
                if (reply == true) {
                    $("#" + collection_id).remove();
                }
            }
        );
    });

});

function addtweets(timeline_id, subpage) {
    cb.__call(
    "collections_entries",
    {
        id: timeline_id
    },
    function (reply2, rate, err) {
        //console.log(timeline_id);
        var parent = document.getElementById(subpage);
        for (var i = 0; i < reply2.response.timeline.length; i ++) {
            var tweet_id = reply2.response.timeline[i].tweet.id;
            var each_tweet = reply2.objects.tweets[tweet_id];
            var user_id = each_tweet.user.id;
            var a = document.createElement('a');
            var li = document.createElement('li');
            li.className = 'favorite_list';
            li.id = tweet_id;
            var div1 = document.createElement('div');
            div1.className = 'row';
            var div2 = document.createElement('div');
            div2.className = 'col-2';
            var img = document.createElement('img');
            img.src = reply2.objects.users[user_id].profile_image_url;
            var div3 = document.createElement('div');
            div3.className = 'favorite_item_cont col-10';
            var span1 = document.createElement('span');
            span1.innerHTML = reply2.objects.users[user_id].name;;
            var span2 = document.createElement('span');
            span2.className = 'item_content';
            span2.innerHTML = reply2.objects.tweets[tweet_id].text;
            var br=document.createElement('br'); 
            span1.appendChild(br);
            li.appendChild(a);
            a.appendChild(div1);
            div1.appendChild(div2);
            div1.appendChild(div3);
            div2.appendChild(img);
            div3.appendChild(span1);
            div3.appendChild(span2);
            parent.appendChild(li);
         }

    }
    
);
}


