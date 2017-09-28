var auth_id = {
  "dg.medulina.com": "d0dee0089411bc5134ae",
  "localhost:8000": "f586bf4498f82125fc48",
  "test.medulina.com": "7a33c7349ef2968b7480",
  "stroke.medulina.com": "3e15212f1b51861a9b2c",
  "tumor.medulina.com": "d0df9c1af2484144b134"
}

var auth_url = {
  "dg.medulina.com": "https://api.medulina.com/api/authenticate/dg/github/",
  "localhost:8000": "https://api.medulina.com/api/authenticate/dg/githublocal/",
  "test.medulina.com": "https://testapi.medulina.com/api/authenticate/test/github/",
  "stroke.medulina.com": "https://api.medulina.com/api/authenticate/stroke/github/",
  "tumor.medulina.com": "https://api.medulina.com/api/authenticate/tumor/github/"
}

// name of project in database
var task_dict = {
  "stroke.medulina.com": "atlas_lesions",
  "tumor.medulina.com": "meningioma001",
  "dg.medulina.com": "db_cor_context03",
  "localhost:8000": "atlas_lesions",
  "test.medulina.com": "cheng_et_al_000"
}

var title_dict = {
  "stroke.medulina.com": "Stroke",
  "tumor.medulina.com": "Meningioma",
  "dg.medulina.com": "Dentate Gyrus",
  "localhost:8000": "Stroke",
}

var context_dict = {
  "stroke.medulina.com": false,
  "tumor.medulina.com": false,
  "localhost:8000": false,
  "dg.medulina.com": true,
}

var task_config = {
  "meningioma001": {care_about_fill: true},
  "atlas_lesions": {care_about_fill: true},
  "cheng_et_al_000": {care_about_fill: true},
  "db_cor_context03": {care_about_fill: false},
}



config = {
  mask_url: 'https://api.medulina.com/api/v1/mask',
  image_url: 'https://api.medulina.com/api/v1/image/',
  player_url: 'https://api.medulina.com/api/v1/user/',
  edit_url: 'https://api.medulina.com/api/v1/mask',
  use_random: false,
  task: task_dict[window.location.host],
  num: 15,
  total_num_images: 50,
  title: title_dict[window.location.host],
  context: context_dict[window.location.host]
}

if (window.location.host == "test.medulina.com") {
  console.log("USING TEST CONFIG")
  config = {
    mask_url: 'https://testapi.medulina.com/api/v1/mask',
    image_url: 'https://testapi.medulina.com/api/v1/image/',
    player_url: 'https://testapi.medulina.com/api/v1/user',
    edit_url: 'https://testapi.medulina.com/api/v1/mask',
    use_random: false,
    task: task_dict[window.location.host],
    num: 15,
    total_num_images: 50,
  }
}
