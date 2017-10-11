  $(".fireworks").hide()

Vue.filter("formatNumber", function(value) {
    return numeral(value).format("0.0[0]"); // displaying other groupings/separators is possible, look at the docs
});


Vue.component('modal', {
    template: `


<div class="modal fade" v-bind:id="id">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{content.title}}</h5>
      </div>
      <div class="modal-body">
        <a v-if="content.url" v-bind:href="content.url"><img style="width:100%; max-width:200px;" v-bind:src="content.image" class="mx-auto d-block"/> </a>
        <p v-if="content.text" v-html="content.text">

        </p>
      </div>
      <div class="modal-footer">
        <span v-if="content.extra_buttons">
        <!-- TODO: undo hardcoding here!! -->
        <button v-for="btn in content.extra_buttons" class="btn btn-danger" data-dismiss="modal" onclick="app.has_filled=true;console.log('hi'); api.do_eval()">{{btn.name}}</button>
        </span>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-if="content.do_dismiss">Close</button>
        <a v-if="content.footer" class="btn btn-primary mx-auto d-block" v-bind:href="content.url">{{content.footer}}</a>
      </div>
    </div>
  </div>
</div>


`,
    props: ['content', 'id'],
});




function get_oauth_id() {
    var oauth_id = config.auth_id[window.location.host];
    return oauth_id
}

var app = new Vue({
    el: '#main',
    data: {
        show: false,
        show_opt: null,
        options: {
            Brightness: {
                val: 50,
                min: 0,
                max: 100,
                step: 1,
                icon: 'fa fa-sun-o fa-2x',
            },
            Contrast: {
                val: 50,
                min: 0,
                max: 100,
                step: 1,
                icon: 'fa fa-adjust fa-2x',
            },
            'Brush Size': {
                val: 1,
                min: 1,
                max: 3,
                step: 1,
                icon: 'fa fa-paint-brush fa-2x',
            },
            'Brush Color': {
                val: 1,
                min: 0,
                max: 1,
                step: 1,
                icon: 'fa fa-tint fa-2x',
            },
        },
        tutorial: false,
        has_filled: false,
        fill: {
          title: "Have you filled your shape?",
          do_dismiss: true,
          image: "image/x.jpg",
          text: `Remember, <strong>Double Tap</strong> to fill your shape.
          Hit Close to keep drawing. Or press, "Submit Anyway"`,
          extra_buttons: [{name: "Submit Anyway", action: function(){
            console.log("hello, i'm here")
            app.has_filled = true;
            api.do_eval()
          }}]
        },
        overlay: true,
        loading: true,
        context: null,
        use_context: config.config["context"],
        startTime: null,
        current_slice: null,
        view_feedback_foo: {
            "missed": true,
            "incorrect": true,
            "correct": true
        },
        alert: {
          title: "Error!",
          image: "image/x.jpg",
          do_dismiss: false,
          text: "You are filling too much! Try closing your loops first."
        },
        login: {
            username: null,
            avatar: 'images/Octocat1.jpg',
            github_id: null,
            total_score: 0,
            do_dismiss: false,
            ave_score: 0,
            n_subs: 0,
            n_test: 0,
            n_try: 0,
            id: null,
            footer: 'Log in with GitHub',
            title: 'Log in with GitHub',
            url: 'https://github.com/login/oauth/authorize?client_id=' + get_oauth_id(),
            image: 'images/Octocat1.jpg',
            token: null
        },
        status: 'Submit',
        instruction: config.config.title,
        score: {
            dice: 0,
            points: 0,
        },
        appMode: null
    },
    computed: {

    },
    methods: {
        hide: function() {
            try {
                main.fn.visible = this.overlay
                main.fp.visible = this.overlay
                main.tp.visible = this.overlay
            } catch (e) {
                console.log("fn, fp, tp not visible yet")
            } finally {

            }




            main.hide();
            this.overlay = !this.overlay;
            this.view_feedback_foo.missed = this.overlay;
            this.view_feedback_foo.incorrect = this.overlay;
            this.view_feedback_foo.correct = this.overlay;
        },

        firework: function(){
          $(".fireworks").show()
          //for (var i=0; i<5; i++){
            animateParticules(
              anime.random(centerX, centerX),
              anime.random(centerY, centerY)
            )

          anime({duration: 600}).finished.then(function(){
            $(".fireworks").hide()
          })
          //autoClick(function(){$(".fireworks").hide()})
        },

        toggle: function(opt) {
            switch (opt) {
                case 'missed':
                    main.fn.visible = !main.fn.visible
                    this.view_feedback_foo.missed = main.fn.visible
                    break;
                case 'incorrect':
                    main.fp.visible = !main.fp.visible
                    this.view_feedback_foo.incorrect = main.fp.visible
                    break;
                case 'correct':
                    main.tp.visible = !main.tp.visible
                    this.view_feedback_foo.correct = main.tp.visible
                    break;
                default:
                    break;
            }
        },

        undo: function() {
            draw.revert(main.roi);
        },
        adjustBrightCont: function() {
            //base.brightness_contrast(doBright(this.options["Brightness"].val), doCont(this.options["Contrast"].val))
            main.doBrightCont()
        },

        applySetting: function() {
            switch (this.show_opt) {
                case "Brightness":
                    main.setBrightness(this.options["Brightness"].val)
                    this.adjustBrightCont()
                    break;
                case "Contrast":
                    main.setContrast(this.options["Contrast"].val)
                    this.adjustBrightCont()
                    break
                case "Brush Color":
                    main.setPaintbrush(this.options["Brush Color"].val)
                case "Brush Size":
                    main.setPaintSize(this.options["Brush Size"].val)
                default:
                    break;
            }
        },

        runEval: function() {
            switch (this.status) {
                case 'Submit':
                    api.do_eval();
                    break;
                case 'Next':
                    api.get_next();
                default:
                    null;
            }
        },
        startTour: function() {
            tour.startIntro()
        },
    },
});

/*document.ontouchstart = function(e){
    e.preventDefault();
}*/

document.ontouchmove = function(e){
    if (e.target.type != "range"){
      e.preventDefault();
    }
}

window.app = app;
