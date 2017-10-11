window.ui = {}

ui.startProgress = function() {
  app.loading = true
}

ui.stopProgress = function() {
  app.loading = false
}

myElement = $('#myCanvas').on('contextmenu', function(evt) {
  evt.preventDefault();
});


ui.show_eval = function() {

  app.status = "Submit"
  $("#submit_button").prop("disabled", false);
  console.log("setting click to do_eval")

}

ui.show_save = function(score) {

  if (window.mode == "error") {
    app.score.points = "error"
    app.score.dice = "error"
  }
  app.status = "Next"

  console.log("setting click to get_next")
  //$("#submit_button").attr("onclick", "get_next()")
  $("#submit_button").prop("disabled", false);


}
