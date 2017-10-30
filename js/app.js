Vue.config.devtools = true

$(".fireworks").hide()

Vue.filter("formatNumber", function(value) {
    return numeral(value).format("0.0[0]"); // displaying other groupings/separators is possible, look at the docs
});

Vue.component('plainmodal', {
  template: `

  <div class="modal fade" v-bind:id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="color:white;">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p v-html="body"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>

        </div>
      </div>
    </div>
  </div>

  `,
  props: ['title', 'body', 'id']
})

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


Vue.component('consent', {
  template: `

        <!-- Informed Consent -->
        <div class="modal fade" id="consent_form">
          <div class="modal-dialog" role="document" style="overflow-y: initial !important;">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Informed Consent</h5>
              </div>
              <div class="modal-body" style="overflow-y: auto; height: 250px;" id="style-2">
                <h4 class="centered">UNIVERSITY OF WASHINGTON</h4>
                <h4 class="centered">CONSENT FORM</h4>

                <h5 class="centered" >Crowdsourcing Image Segmentation</h5>
                <br>
                <h5>RESEARCHERS:</h5>
                <p>
                Anisha Keshavan<br>
                University of Washington eScience Institute and Institute for Neuroengineering<br>
                keshavan@uw.edu<br>
                </p>
                <p>
                Jason Yeatman<br>
                University of Washington Institute for Neuroengineering<br>
                jdyeatman@uw.edu<br>
                </p>
                <p>
                Ariel Rokem<br>
                University of Washington eScience Institute<br>
                arokem@uw.edu<br>
                </p>

                <h5>RESEARCHER’S STATEMENT:</h5>
                <p>
                We are asking you to be in a research study.  The purpose of this consent form is to give you the information you will need to help you decide whether to be in the study or not.  Please read the form carefully.  You may ask questions about the purpose of the research, what we would ask you to do, the possible risks and benefits, your rights as a volunteer, and anything else about the research or this form that is not clear. Please email keshavan@uw.edu any questions.  When we have answered all your questions, you can decide if you want to be in the study or not.  This process is called “informed consent.”
                </p>

                <h5>PURPOSE OF THE STUDY</h5>
                <p>
                Image segmentation is a method to take measurements from images, but computer algorithms often make mistakes. The purpose of this study is to train better computer algorithms to segment images, and also correct any errors the computer makes.  In particular, we aim to train you to accurately measure images through an image segmentation game. We aim to 1) collect image segmentation data from you, 2) track how quickly and accurately you learn to segment images, and 3) combine segmentations from many users into the most accurate segmentation. This information will be used to train new computer algorithms.
                </p>

                <h5>STUDY PROCEDURES</h5>
                <p>
                The study starts with instructions on how to segment images for a particular task. We will show images with arrows pointing to the structure in the images we want you to segment, or “paint”. The different image editing features of the game will be presented (such as: paint, fill, erase, change brightness/contrast).
                </p>
                <p>
                After reading the instructions, you will be asked to log in. You may use an existing social media login (e.g. Twitter, Facebook, Google, etc.), and you will be asked to create a username. You may also choose to include your social media avatar to display alongside your username in the public leaderboard.
                </p>
                <p>
                Each task consists of 1 image that needs to be segmented. When complete, you will click the “submit” button. Upon submission, the image might be scored against a “ground truth” image from a researcher, and you will receive feedback on how well you did. When you are ready, you can click “Next” to segment a new image. If your segmentations are deemed accurate enough by the computer, you will be presented with new images to segment, and you will not receive feedback on your segmentation. Instead, you will receive points, that will increase your positioning on a public leaderboard.
                </p>
                <p>
                You may use any device with a web browser (computer, tablet, or phone). We will record all settings you use on the application, the image coordinates you mark, your screen resolution, and your username. This data will be made publically available to researchers.
                </p>
                <p>
                The whole study can be finished online, and you may complete however many tasks you wish. Each task can take anywhere from 30 seconds to 5 minutes. You may stop playing at any time.
                </p>

                <h5>RISKS, STRESS, OR DISCOMFORT</h5>
                <p>
                Some people feel that providing information for research or having the research session recorded is an invasion of privacy. If you wish to remain anonymous, we recommend creating an anonymous username that does not include any identifiers relating to you.
                </p>

                <h5>BENEFITS OF THE STUDY</h5>
                <p>
                This study will help us to take accurate measurements of images. These measurements will be used for scientific research.
                </p>

                <h5>CONFIDENTIALITY OF RESEARCH INFORMATION</h5>
                <p>
                Your social media login information (such as email address) will remain confidential.
                Government or university staff sometimes review studies such as this one to make sure they are being done safely and legally.  If a review of this study takes place, your records may be examined.  The reviewers will protect your privacy.  The study records will not be used to put you at legal risk of harm.
                </p>

                <h5>OTHER INFORMATION</h5>
                <p>
                You may refuse to participate and you are free to withdraw from this study at any time without penalty or loss of benefits to which you are otherwise entitled. Your compensation will be based on the number of images segmented at a minimum rate approximately equal to $8/hour. Depending on your speed and accuracy, your compensation may be higher. Information about you is confidential. If the results of this study are published or presented, we will not use your name.
                </p>


                <h5>RESEARCH-RELATED INJURY</h5>
                <p>
                If you think you have been harmed from being in this research, contact Anisha Keshavan at keshavan@uw.edu.
                * Please note that we cannot ensure the confidentiality of information sent via e-mail.
                </p>


                <h5>SUBJECT’S STATEMENT</h5>
                <p>
                This study has been explained to me.  I am age 18 or older, and I volunteer to take part in this research.  I have had a chance to ask questions.  If I have questions later about the research, or if I have been harmed by participating in this study, I can contact one of the researchers listed on the first page of this consent form.  If I have questions about my rights as a research subject, I can call the Human Subjects Division at (206) 543-0098 or email hsdinfo@uw.edu.  I will receive a copy of this consent form via email.
                </p>

              </div>
              <div class="modal-footer">

                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" v-model="age"> I am 18 years or older
                  </label>
                </div>

                <div class="form-check form-check-inline">
                  <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" v-model="consent"> I consent to this study
                  </label>
                </div>

                <div class="form-check form-check-inline disabled">
                <button class="btn btn-primary colorBold" v-bind:disabled="!(age && consent)" data-dismiss="modal" v-on:click="app.afterConsent(this, this)">Submit</button>
              </div>


              </div>
            </div>
          </div>
        </div>
`,
props: ["age", "consent"],


})


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
        consent: {
          age: false,
          consent: false
        },
        loginType: null,
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
            use_profile_pic: null,
            send_emails: null,
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
            transfer_token:null,
            user_id: null,
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

        showConsent: function(){
          $("#consent_form").modal({
            backdrop: 'static',
            keyboard: false
          })

        },

        afterConsent: function(age, consent){
          console.log("AFTER CONSENT", age, consent)
          this.consent.consent = true; //TODO: fix 2 way binding w/ custom component
          this.consent.age = true; //TODO: fix 2 way binding w/ custom component
          this.save_to_storage("consent", true)
          if (this.loginType == "anon"){
            $.get(config.config.anon_url+app.consent.consent, function(data){
              console.log("anon data is", data)
              app.login.token = data.token;
              store.set('user_token', data.token);
              app.login.user_id = data.user_id;
              app.login.transfer_token = data.transfer_token;
              login.getUserInfo(app.login.user_id, function(){
                var url = api.get_image_url()
                main.get_images(url, main.start);
              })

            });
          }
          else {
            if (app.login.token !=null){
            //send consent to server
            var url = api.get_image_url()
            main.get_images(url, main.start);
            }
            else {
              $("#login2").modal({
                backdrop: 'static',
                keyboard: false
              })
            }
          }

        },

        anonymousLogin: function(){
          this.loginType = "anon"
          this.showConsent()
        },

        save_to_storage(key,value){
          console.log("saving", key, value)
          store.set(key, value)
        }

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
