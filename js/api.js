// globals:
// app (from index.html)
// config (from js/config.js)
// roi, get_images (from js/main.js)
// jquery, store

window.api = {}

$.ajaxSetup({ cache: false });

api.get_image_url = function(){
  var url = config.image_url + '?where={"task":"' + config.task + '"}'
  url = url + "&max_results=1"
  url = url + "&user_id="+app.login.id+"&token="+app.login.token

  console.log("URL FOR GET IS", url)
  return url
}

api.get_mask_url = function(image_info){
  var url = config.mask_url + '?where={"mode":"truth","image_id":"' + image_info._id + '"}'
  console.log('Mask URL is', url)
  return url
}

api.do_eval = function(){
  console.log('DOING EVAL\n\n')

  var data = window.currentData._items[0]

  var profile = store.get('github_profile')
  var score = {'name': app.login.username, 'edit_data_id': data._id}
  console.log("app.has_filled", app.has_filled)
  if (!app.has_filled && task_config[task_dict[window.location.host]].care_about_fill){

    $('#fillModal').modal({
      backdrop: 'static',
      keyboard: false,
    });
    console.log("YOU HAVE NOT FILLED")

    return
  }

  if (draw.history.length == 1 && draw.history[0].length == 0){
    if (confirm("Are you sure you want to submit an empty drawing?")){
      ui.startProgress()
      $('#submit_button').prop('disabled',true);
      var segmentation = roi.getNonZeroPixels()
      ui.stopProgress()
      api.do_save(score, JSON.stringify(segmentation))

    } else {
      ui.stopProgress()

    }

  } else {
    ui.startProgress()
    $('#submit_button').prop('disabled',true);
    var segmentation = roi.getNonZeroPixels()
    ui.stopProgress()
    api.do_save(score, JSON.stringify(segmentation))
  }

  //})
}


api.create_json_request = function(data, url, auth){

  var settings = {
    'async': true,
    'crossDomain': true,
    'url': url,
    'method': 'POST',
    'headers': {
    },
    'processData': false,
    'data': JSON.stringify(data)
  }

  if (auth){
    settings.headers["authorization"] = auth
  }

  return settings

}

api.do_save = function(score, edits){
  ui.startProgress()
  var imgbody = {
    'image_id': window.currentData._items[0]._id,
    'pic': edits,
    'mode': 'try',
    'task': config.task,
    //'score': score.accuracy,
    'user_id': app.login.id, //score['name']
    'user_agent': navigator.userAgent,
    'resolution': [window.innerWidth, window.innerHeight]
  }
  if (app.appMode == "test"){
    imgbody["mode"] = "test"
  }
  var timeDiff = new Date() - app.startTime // in miliseconds
  imgbody["time"] = timeDiff

  var token = "NnrP65CXaSnZ0aLPZ8Ox64d0pDlSKS0R8wpymwLr";
  var settings = api.create_json_request(imgbody, config.edit_url, token)
  settings.headers['content-type'] = 'application/json'

  console.log("settings are", settings)
  settings["error"] = function(e){
    alert("there has been an error", e, "settings were", settings)
    console.log("there has been an error", e, "settings were", settings)

    ui.stopProgress()
    window.appMode = "error"
    ui.show_save({"accuracy": "Err"})
  }

  $.ajax(settings).done(function(response){
    console.log("response is", response)
    window.response = response;
    if (app.appMode == "train"){
      ui.show_save(score)
      roi.remove()
      add_tp(response.tp)
      add_fp(response.fp)
      add_fn(response.fn, 1)
      //roi.insertAbove(fn)

      app.score.dice = response.score;

    }


    var profile = store.get('user_token');
    getUserInfo(profile, function(){
      console.log("APP Mode", app.appMode)
      if (app.appMode == "test"){
          app.firework()
          api.get_next()
      } else{
        ui.show_save(score)
      }
    })
  })


}

api.get_next = function(){

  $('#submit_button').prop('disabled',true);
  ui.startProgress()

  var url = api.get_image_url()
  get_images(url, function(base_url){
    base.setSource('data:image/jpeg;base64,'+base_url)

    roi.clear()
    draw.history = [[]]
    window.zoomFactor = 1
    tp.clear()
    fp.clear()
    fn.clear()
    view.setZoom(1);
    window.panFactor = {x:0, y:0}

    ui.show_eval()
  })


}
