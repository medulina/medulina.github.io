window.login = {}

login.getUserInfo =function(user_token, callback) {
  /*

  Asks the server for user information based on a token from /authenticate/
  Inputs: user_token (string)
  callback: function to run after getting info. Takes 0 args

  This function updates the `app` variable, which is the main vue controller.
  (TODO: Maybe this should be passed in? or set in another callback?)

  */

  // for debugging:
  console.log("user token is", user_token)

  // AJAX settings for the call
  // TODO: removed hardcoded URL
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.config.player_url + "?where=token%3D%3D%22" + user_token + "%22",
    "method": "GET",
    "headers": {},
    "processData": false,
    "contentType": false,
  }

  if (app.loginType == "anon"){
    settings.url = config.config.player_url + '?where=_id%3D%3D"' + app.login.user_id + '"'
  }

  // for debugging, log the settings
  console.log("settings is", settings)

  // when the GET is done. set the app variables and run the callback
  $.get(settings).done(function(data) {
    if (data._meta.total) {
      console.log("found user in db", data)
      var score_info = data._items[0]
      console.log("score_info is", score_info)
      app.login.ave_score = score_info.ave_score;
      app.consent.consent = score_info.has_consented;
      app.consent.age = score_info.has_consented;
      app.login.n_subs = score_info.n_subs;
      app.login.n_test = score_info.n_test;
      app.login.n_try = score_info.n_try;
      app.login.total_score = score_info.total_score;
      app.login.id = score_info._id;
      app.login.avatar = score_info.avatar;
      app.login.github_id = score_info.id;
      app.login.username = score_info.username;
      app.login.token = user_token;
      callback()

    } else {
      // if data is empty, pop up the login modal
      // TODO: for some reason this does not work.
      console.log("did not find data", data)
      store.clearAll()
      $('#loginModal').modal({
        backdrop: 'static',
        keyboard: false,
      });

    }
    ui.stopProgress();
  });
}




login.Login =function(callback) {
  /*
Starts the whole process

  */

  var profile = store.get('user_token');
  if (profile) {
    /*app.login.username = profile.login;
    app.login.avatar = profile.avatar_url;
    app.login.github_id = profile.id;*/
    console.log("profile exists")

    login.getUserInfo(profile, callback)


    //callback();
  } else {
    try {
      ui.startProgress();
      var code = window.location.href.match(/\?code=(.*)/)[1];
      if (store.get("consent")){
        code = code + '?has_consented=true'
      }
      if (store.get("nickname")){
        code = code + '&nickname=TMP'.replace("TMP", store.get("nickname"))
      }
      if (store.get("email")){
        code = code + '&use_email=true'
      }
      if (store.get("profile_pic")){
        code = code + '&use_profile_pic=true'
      }

      var oauth_url = config.auth_url[window.location.host];

      console.log("auth url is", oauth_url + code)


      $.getJSON(oauth_url + code, function(data) {
        console.log('data token is', data.token);
        login.getUserInfo(data.token, function(profile) {
          console.log("", profile);
          /*app.login.username = profile.login;
          app.login.avatar = profile.avatar_url;
          app.login.github_id = profile.id;*/

          if (history.pushState) {
            var newurl = window.location.protocol + '//' + window.location.host +
              window.location.pathname;
            window.history.pushState({
              path: newurl
            }, '', newurl);
          };

          store.set('user_token', data.token);
          callback();
          //getUserInfo(profile, callback)


        });
      }).fail(function(data){
        console.log("This failed!!", data)
        app.showConsent()
      });

    } catch (e) {
      console.log("there was an error", e)
      $('#loginModal').modal({
        backdrop: 'static',
        keyboard: false,
      });
    }
  }

}

login.logout =function() {
  store.clearAll();
  window.location.href = '/';
}
