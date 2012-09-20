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