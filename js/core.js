// JavaScript Document
$(document).ready(function() {
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
		
		$(".toggle-screen-bit").bind("click", function() {
			$(document).toggleFullScreen();
		});
		$(document).bind("fullscreenchange", function(e) {
			var button_object = $('.toggle-screen-bit');
			if (button_object.html() == "Normal Screen")
			{
				button_object.html("Full Screen");
			} else {
				button_object.html("Normal Screen");
			}
		});
		
		var dashboard_show = true;
		$(document).mousemove(function(event) {
			if(dashboard_show)
			{
				//dashboard_show = false;
				showPanel();
			}
		});
		$(".dashboard-wrapper").mouseover(function() {
			dashboard_show = false;
		});
		$(".dashboard-wrapper").mouseout(function() {
			dashboard_show = true;
		});
		
		function showPanel()
		{
			dashboard_show = false;
			if ($(".dashboard-wrapper").css("top") != '0px')
			{
				$(".dashboard-wrapper").stop().animate({top: '0px'}, 500, 
				function() { dashboard_show = false; });
			}
		}
		function hidePanel()
		{
			$(".dashboard-wrapper").stop().animate({top: '-140px'}, 500, function() { dashboard_show = true; });
		}
		
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