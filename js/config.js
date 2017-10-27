window.config = {}

config.auth_id = {
  "dg.medulina.com": "d0dee0089411bc5134ae",
  "localhost:8000": "f586bf4498f82125fc48",
  "test.medulina.com": "7a33c7349ef2968b7480",
  "stroke.medulina.com": "3e15212f1b51861a9b2c",
  "tumor.medulina.com": "d0df9c1af2484144b134"
}

config.auth_url = {
  "dg.medulina.com": "https://api.medulina.com/api/authenticate/dg/github/",
  "localhost:8000": "https://api.medulina.com/api/authenticate/dg/githublocal/",
  "test.medulina.com": "https://testapi.medulina.com/api/authenticate/test/github/",
  "stroke.medulina.com": "https://api.medulina.com/api/authenticate/stroke/github/",
  "tumor.medulina.com": "https://api.medulina.com/api/authenticate/tumor/github/"
}

// name of project in database
config.task_dict = {
  "stroke.medulina.com": "atlas_lesions",
  "tumor.medulina.com": "cheng_et_al_001",
  "dg.medulina.com": "db_cor_context03",
  "localhost:8000": "cheng_et_al_001",
  "test.medulina.com": "cheng_et_al_001"
}

config.title_dict = {
  "stroke.medulina.com": "Stroke",
  "tumor.medulina.com": "Meningioma",
  "test.medulina.com": "Meningioma",
  "dg.medulina.com": "Dentate Gyrus",
  "localhost:8000": "Meningioma",
}

config.context_dict = {
  "stroke.medulina.com": false,
  "tumor.medulina.com": false,
  "localhost:8000": false,
  "dg.medulina.com": true,
  "test.medulina.com": false,
}

config.task_config = {
  "meningioma001": {care_about_fill: true},
  "atlas_lesions": {care_about_fill: true},
  "cheng_et_al_001": {care_about_fill: true},
  "db_cor_context03": {care_about_fill: false},
}

//config.anon_url = "https://testapi.medulina.com/api/anonymous?has_consented="

config.config = {
  mask_url: 'https://api.medulina.com/api/v1/mask',
  image_url: 'https://api.medulina.com/api/v1/image/',
  base_url: "https://api.medulina.com",
  player_url: 'https://api.medulina.com/api/v1/user/',
  edit_url: 'https://api.medulina.com/api/v1/mask',
  anon_url: "https://api.medulina.com/api/anonymous?has_consented=",
  use_random: false,
  task: config.task_dict[window.location.host],
  num: 15,
  total_num_images: 50,
  title: config.title_dict[window.location.host],
  context: config.context_dict[window.location.host]
}

if (window.location.host == "test.medulina.com" || window.location.host == "localhost:8000") {
  console.log("USING TEST CONFIG")
  config.config = {
    mask_url: 'https://testapi.medulina.com/api/v1/mask',
    image_url: 'https://testapi.medulina.com/api/v1/image/',
    base_url: "https://testapi.medulina.com",
    anon_url: "https://testapi.medulina.com/api/anonymous?has_consented=",
    player_url: 'https://testapi.medulina.com/api/v1/user',
    edit_url: 'https://testapi.medulina.com/api/v1/mask',
    use_random: false,
    task: config.task_dict[window.location.host],
    title: config.title_dict[window.location.host],
    num: 15,
    total_num_images: 50,
    title: config.title_dict[window.location.host],
    context: config.context_dict[window.location.host]
  }
}
