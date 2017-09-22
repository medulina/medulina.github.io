function startIntro(){
       var intro = introJs();
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
               element: '#hideshow',
               intro: `Click here to <strong>hide</strong>/<strong>show</strong> your drawing`,
               position: 'top'
             },
             {
               element: '#menuButton',
               intro: `This menu gives you options to
               change your <strong>brush size</strong>,
               <strong>brush color </strong>,
               image <strong>brightness</strong>
               and <strong>contrast</strong>`,
               position: 'top'
             },
             {
               element: '#undoButton',
               intro: "Click here to <strong>undo</strong>",
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

              if(this._currentStep == 3){
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
              }
              //"introjs-fixedTooltip" is the other thing
              if(this._currentStep == 4){
                  overlay = document.getElementsByClassName("introjs-tooltipReferenceLayer");
                  console.log(overlay)
                  for(i=0; i<overlay.length; i++) {
                      //overlay[i].style.position = 'fixed';
                      overlay[i].style.bottom = window.innerWidth <= 478 ? '110px' : '0px';
                      overlay[i].style.top = null;

                  }
              }
              if(this._currentStep == 5){
                  overlay = document.getElementsByClassName("introjs-tooltipReferenceLayer");
                  console.log(overlay)
                  for(i=0; i<overlay.length; i++) {
                    overlay[i].style.position = 'fixed';
                      overlay[i].style.bottom = '20px';
                      overlay[i].style.top = null;
                  }
              }
         });
         intro.start();
     }
