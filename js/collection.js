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
                var each_collection = reply.objects.timelines[timeline_id];
                var subpage = "pageSubmenu" + i;
                
                each_collection["page"] = "#pageSubmenu" + i;
                each_collection["subpage"] = "pageSubmenu" + i;
                each_collection["collection_id"] = timeline_id;
                var collections = ich.favorites(each_collection);
                $("#favorites").append(collections);
                $("#folder_name").append("<option value ="+ timeline_id +">"+each_collection.name+"</option>"); 

                addtweets(timeline_id, subpage);               
            }
                
        }
    );

    $(document).on("click", ".delete_icon", function(){
        
        var collection_id = $(this).closest('li').attr('id');
        //var collection_id = parent.attr('id');
        //console.log(collection_id);
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

    $(document).on("click", "#add_to_list", function(){

        var select = $("#folder_name option:selected");
        var collection = select.val();
        var tweet = $('#tweet_id_span').text();
        //console.log(select.val());
        cb.__call(
            "collections_entries_add",
            {
                //name: 'FeinerFans',
                id : collection,
                tweet_id : tweet
                // screen_name: 'Portfolio'
            },
            function(reply, rate, err) {
                if (err) {

                }
                if (reply) {
                    cb.__call(
                        "statuses_show_ID",
                        {
                            //name: 'FeinerFans',
                            id : tweet
                            // screen_name: 'Portfolio'
                        },
                        function(reply2, rate, err) {
                            var parent = $("#"+collection).children('ul')[0];
                            var img_src = reply2.user.profile_image_url;
                            var name = reply2.user.name;
                            var text = reply2.text;
                            addtweet(parent, tweet, img_src, name, text);
                        }
                    );
                }
                
            }
        );
    });

    $('#Modal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var text = button.data('whatever');
        //console.log(text);
        $('#tweet_id_span').text(text);
    }) 

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
            var img_src = reply2.objects.users[user_id].profile_image_url;
            var name = reply2.objects.users[user_id].name;
            var text = reply2.objects.tweets[tweet_id].text;
            addtweet(parent, tweet_id, img_src, name, text);

            // var a = document.createElement('a');
            // var li = document.createElement('li');
            // li.className = 'favorite_list';
            // li.id = tweet_id;
            // var div1 = document.createElement('div');
            // div1.className = 'row';
            // var div2 = document.createElement('div');
            // div2.className = 'col-2';
            // var img = document.createElement('img');
            // img.src = reply2.objects.users[user_id].profile_image_url;
            // var div3 = document.createElement('div');
            // div3.className = 'favorite_item_cont col-10';
            // var span1 = document.createElement('span');
            // span1.innerHTML = reply2.objects.users[user_id].name;;
            // var span2 = document.createElement('span');
            // span2.className = 'item_content';
            // span2.innerHTML = reply2.objects.tweets[tweet_id].text;
            // var br=document.createElement('br'); 
            // span1.appendChild(br);
            // li.appendChild(a);
            // a.appendChild(div1);
            // div1.appendChild(div2);
            // div1.appendChild(div3);
            // div2.appendChild(img);
            // div3.appendChild(span1);
            // div3.appendChild(span2);
            // parent.appendChild(li);
         }
        }    
    );
}

function addtweet(parent, tweet_id, img_src, name, text) {
    console.log(parent);
    var a = document.createElement('a');
    var li = document.createElement('li');
    li.className = 'favorite_list';
    li.id = tweet_id;
    var div1 = document.createElement('div');
    div1.className = 'row';
    var div2 = document.createElement('div');
    div2.className = 'col-2';
    var img = document.createElement('img');
    img.src = img_src;
    var div3 = document.createElement('div');
    div3.className = 'favorite_item_cont col-10';
    var span1 = document.createElement('span');
    span1.innerHTML = name;
    var span2 = document.createElement('span');
    span2.className = 'item_content';
    span2.innerHTML = text;
    var br=document.createElement('br'); 
	
	//kuer --delete btn
	var div_delete =document.createElement('div');
	div_delete.className='delete_icon_cont';
	var span_delete1 = document.createElement('span');
	var span_delete2 = document.createElement('span');
	span_delete1.className = 'btn btn-danger btn-sm delete_icon';
	span_delete2.className = 'glyphicon glyphicon-trash';
	
	div_delete.appendChild(span_delete1);
	span_delete1.appendChild(span_delete2);
	div_delete.style.display = 'none';
	
    span1.appendChild(br);
    li.appendChild(a);
    a.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div2.appendChild(img);
    div3.appendChild(span1);
    div3.appendChild(span2);
	a.appendChild(div_delete);
    parent.appendChild(li);
}

var Is_edit_btn =true;
function editFavorite()
{
	var div1 = $('.delete_icon_cont');
	var div2 =$('.edit_cont');
	var icon =$('#edit_favorite_twitter');
	if(Is_edit_btn){
		Is_edit_btn = false;
		
		div1.show();
		div2.show();
		icon.addClass('btn-success');
		icon.removeClass('btn-outline-success');
		//icon.innerHTML ='xxxx';
		
	}else{
		Is_edit_btn = true;
		icon.removeClass('btn-success');
		icon.addClass('btn-outline-success');
		div1.hide();
		div2.hide();
	}
}

