function startIntro(){
       var intro = introJs();

       var is_small = window.innerWidth <= 478 ? true : false

         intro.setOptions({

           steps: [
             {
               intro: `<h1> Welcome! </h1>
                <p> This tutorial will introduce the features of <strong>Medulina</strong> </p>

               `
             },
             {
               //element: '#myCanvas',
               intro: `

               <h2 style="text-align: center"> Draw and Fill </h2>

                <p> <strong> Click and Drag </strong> to draw a shape on the image </p>

                <p> <strong> Double Tap </strong> to fill your shape </p>


               `
             },
             {
               //element: '#myCanvas',
               intro: `

               <h2 style="text-align: center"> Zoom and Pan </h2>

                <p> <strong> Scroll </strong>  or <strong> Pinch </strong> to zoom the image </p>

                <p> <strong> Right-click + drag </strong> or <strong> Two finger drag </strong> to pan the image </p>


               `
             },
             {
               //element: is_small ? null : '#hideshow',
               intro: `

               <h2 style="text-align: center"> Hide and Show </h2>


               Click TMP to <strong>hide</strong>/<strong>show</strong>
                       your drawing`.replace("TMP", `
                       <button class="btn btn-lg btn-outline-info" style="background-color: #313e50">
                           <i class="fa fa-eye" aria-hidden="true"></i>
                       </button>
                       `),
               position: 'top'
             },
             {
               //element: '#menuButton',
               intro: `

               <h2 style="text-align: center"> Brush Options </h2>

               <p>The menu button

               <button class="btn btn-lg btn-outline-info" style="background-color: #313e50">
                   <i class="fa fa-chevron-up" aria-hidden="true"></i>
               </button>

               gives you options to
               change your
               </p>
               <p style="text-align: center">
               <i class="fa fa-paint-brush fa-2x tour" style="
                   background: #313e50;
                   color: white;
                   padding: 3px;
                   border-style: solid;
                   border-color: #87bcde;
                   border-width: 1px;
                   border-radius: 5px;
               "></i>

               <strong>brush size</i></strong></p>
               <p style="text-align: center">and</p>
               <p style="text-align: center">
               <i class="fa fa-tint fa-2x tour" style="
                   background: #313e50;
                   color: white;
                   padding: 3px;
                   padding-left:9px;
                   padding-right: 9px;
                   border-style: solid;
                   border-color: #87bcde;
                   border-width: 1px;
                   border-radius: 5px;
               "></i>

               <strong>brush color</i></strong></p>`,
               position: 'top'
             },
             {
               //element: '#menuButton',
               intro: `

               <h2 style="text-align: center"> Image Options </h2>

               <p>You can also change the image
               </p>
               <p style="text-align: center">
               <i class="fa fa-sun-o fa-2x tour" style="
                   background: #313e50;
                   color: white;
                   padding: 3px;
                   border-style: solid;
                   border-color: #87bcde;
                   border-width: 1px;
                   border-radius: 5px;
               "></i>

               <strong>brightness</i></strong></p>
               <p style="text-align: center">and</p>
               <p style="text-align: center">
               <i class="fa fa-adjust fa-2x tour" style="
                   background: #313e50;
                   color: white;
                   padding: 3px;
                   padding-left:5px;
                   padding-right: 5px;
                   border-style: solid;
                   border-color: #87bcde;
                   border-width: 1px;
                   border-radius: 5px;
               "></i>

               <strong>contrast</i></strong></p>`,
               position: 'top'
             },
             {
               //element: '#undoButton',
               intro: `

               <h2 style="text-align: center"> Undo </h2>


               Click

               <button class="btn btn-lg btn-outline-info" style="background-color: #313e50">
                   <i class="fa fa-undo" aria-hidden="true"></i>
               </button>

               to <strong>undo</strong>`,
               position: 'top'
             },
             {
               element: '#submit_button',
               intro: 'Finally, <strong> submit </strong> your drawing'
             }
           ]
         });
         intro.onbeforechange(function(targetElement){
           console.log("before change")
           console.log("currentStep is", this._currentStep)

         })
         intro.onafterchange(function(targetElement) {
            console.log("currentStep is", this._currentStep)
            //window.scrollTo(0,0)

              /*if(this._currentStep == 3){
                  overlay = document.getElementsByClassName("introjs-tooltipReferenceLayer");
                  console.log(overlay)
                  for(i=0; i<overlay.length; i++) {
                      //overlay[i].style.left = '10px';
                      //overlay[i].style.right = '10px';
                      overlay[i].style.position = 'fixed';
                      overlay[i].style.bottom = '20px';
                      overlay[i].style.top = null;

                      //Set css properties like this.
                  }
              }*/
              //"introjs-fixedTooltip" is the other thing
              if(this._currentStep == 4){
                  app.show = true;
              }

              if(this._currentStep == 6){
                  app.show = false;
              }
              /*if(this._currentStep == 5){
                  overlay = document.getElementsByClassName("introjs-tooltipReferenceLayer");
                  console.log(overlay)
                  for(i=0; i<overlay.length; i++) {
                    overlay[i].style.position = 'fixed';
                      overlay[i].style.bottom = '20px';
                      overlay[i].style.top = null;
                  }
              }*/
         });
         intro.start();
     }
