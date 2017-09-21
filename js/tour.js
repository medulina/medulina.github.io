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
         intro.start();
     }
