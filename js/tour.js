function startIntro(){
       var intro = introJs();
         intro.setOptions({

           steps: [
             {
               intro: `<h1> Welcome! </h1>
                <p> This tutorial will step through the features of Medulina </p>

               `
             },
             {
               //element: '#myCanvas',
               intro: `

               <h1 style="text-align: center"> Draw and Fill </h1>

                <p> <strong> Click and Drag </strong> to draw a shape on the image </p>

                <p> <strong> Double Tap </strong> to fill your shape </p>


               `
             },
             {
               element: '#hideshow',
               intro: "Click here to hide/show your drawing",
               position: 'top'
             },
             {
               element: '#menuButton',
               intro: 'This menu gives you options to change your brush size, brush color, image birghtness and contrast',
               position: 'top'
             },
             {
               element: '#undoButton',
               intro: "Click to undo",
               position: 'top'
             },
             {
               element: '#submit_button',
               intro: 'Finally, <strong> submit </strong> your drawing'
             }
           ]
         });
         intro.onafterchange(function(targetElement) {
            console.log("currentStep is", this._currentStep)
            window.scrollTo(0,0)

              if(this._currentStep == 2){
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
              if(this._currentStep == 3){
                  overlay = document.getElementsByClassName("introjs-tooltipReferenceLayer");
                  console.log(overlay)
                  for(i=0; i<overlay.length; i++) {
                      //overlay[i].style.position = 'fixed';
                      overlay[i].style.bottom = window.innerWidth <= 478 ? '100px' : '0px';
                      overlay[i].style.top = null;

                  }
              }
              if(this._currentStep == 4){
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
