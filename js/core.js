// JavaScript Document
$(document).ready(function() {
	$("#loginBox .btn.login").click(function(e){
		e.preventDefault();
		
		FB.login(function(resp) {
		   if (resp.authResponse) {
			 //console.log('Welcome!  Fetching your information.... ');
			 FB.api('/me?fields=albums', function(response) {
			   var content = '';
			   $.each(response.albums.data, function(index, value){
					content += '<option value="'+value.id+'">'+value.name+'</option>';
			   });
			   $("#loginBox").fadeOut(500);
			   setTimeout('$("#slideshowFrame").fadeIn(500)', 500);
			   $(".album-list").html(content);
			 });
		   } else {
			 //console.log('User cancelled login or did not fully authorize.');
		   }
		}, {scope: 'email,user_photos,friends_photos'});
	});
	
	$(".tag-input .btn.create").click(function(e){
		e.preventDefault();
		
		if($("input[name=tag_name]").val().length > 0){
			var arr = $("input[name=tag_name]").val().split(","),
				result_arr = new Array(),
				temp_arr = new Array();
				
			$.each(arr, function(index, value){
				arr[index] = value.trim().toLowerCase();
			});
			
			FB.api($(".album-list").val()+'/?fields=photos.fields(tags,source,picture)', function(data){
				$.each(data.photos.data, function(index, value){
					if(value.tags != undefined){
						$.each(value.tags.data, function(i, v){
							if($.inArray(v.name.toLowerCase(), arr) != -1){
								temp_arr["id"] = value.id;
								temp_arr["thumb_url"] = value.picture;
								temp_arr["source_url"] = value.source;
								result_arr.push(temp_arr);
								
								return false;
							}
						});
					}
				});
				
				if(result_arr.length > 0){
					var content = '';
					
					$.each(result_arr, function(index, value){
						content += '<div class="slideshow-bit"><img src="'+value.source_url+'" class="slide"></div>';
					});
					
					$(".slideshow-wrapper").html(content);
				} else {
					alert("No match.");
				}
			});
		}
	});
	
	$(function() {		
		var slides = $(".slideshow-bit");
		var slides_size = slides.size();
		var index = 0;
		var last_index = null;
		var slide_time = 3000;
		var transition_time = 1000;
		var loop = true;
		var animate_id = null;
		
		slideInit();				
		if (slides_size > 1)
		{
			setInterval(function () { animateSlide(slides, index); }, slide_time); 
		}
		
		$(".full-screen-bit").bind("click", function() {
			$(document).fullScreen(true);
		});
		
		function slideInit()
		{
			$(".slideshow-bit .slide").each(function() {
				//console.log($(this).width() + "x" + $(this).height());
				var width = $(this).width();
				var height = $(this).height();
				if(width > height) 
					$(this).css("width", "100%"); 
				else 
					$(this).css("height", "100%");
			});
		}
		
		function animateSlide(slides, idx)
		{
			console.log(idx);
			if (last_index != null)
			{
				$(slides[last_index]).fadeOut(transition_time);
			}
			$(slides[idx]).fadeIn(transition_time);
			last_index = index;
			if (slides_size == index + 1)
			{
				index = 0;
				if (!loop)
				{
					//clear time interval
					clearInterval(animate_id);
				}
			} else {
				index++;
			}
		}
	});
});