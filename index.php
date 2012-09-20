<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.fullscreen.js"></script>
<script type="text/javascript" src="js/core.js"></script>
<link rel="stylesheet" media="screen" type="text/css" href="css/core.css" />
</head>

<body>

<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '382421018493996', // App ID
      channelUrl : '//facebook.beforeitistoolate.com/benny/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
		// the user is logged in and has authenticated your
		// app, and response.authResponse supplies
		// the user's ID, a valid access token, a signed
		// request, and the time the access token 
		// and signed request each expire
		var uid = response.authResponse.userID;
		var accessToken = response.authResponse.accessToken;
		
		FB.api('/me?fields=albums', function(response) {
		   var content = '';
		   //console.log(response);
		   $.each(response.albums.data, function(index, value){
				content += '<option value="'+value.id+'">'+value.name+'</option>';
		   });
		   $("#loginBox").fadeOut(500);
		   setTimeout('$("#slideshowFrame").fadeIn(500)', 500);
		   $(".album-list").html(content);
		});
	  }
	});
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>

<div id="loginBox">
	<button class="btn login">Login with Facebook</button>
</div>
<div id="slideshowFrame" style="display: none;">
    <div class="dashboard-wrapper">
        <div class="dashboard-gap">
            <div class="dashboard">
                <div class="album-bit">
                    <label>Album</label>
                    <select class="album-list"></select>
                </div>
                <div class="clear"></div>
                <div class="tag-bit">
                    <label>Includes</label>
                    <div class="tag-input">
                        <input type="text" name="tag_name" placeholder="type names to include in slideshow" />
						<button class="btn create">Create!</button>
                    </div>
                    <div class="tag-all">
                        All <input type="checkbox" name="include_all" value="true" />
                    </div>
                </div>
                <div class="clear"></div>
                <div class="screen-mode">
                    <label>Screen Mode</label>
                    <button class="toggle-screen-bit">
                        Full Screen
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="slideshow-wrapper"></div>
</div>
</body>
</html>