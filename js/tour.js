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
               element: '#myCanvas',
               intro: `

               <h1 style="text-align: center"> Draw and Fill </h1>

                <p> <strong> Click and Drag </strong> to draw a shape on the image </p>

                <p> <strong> Double Tap </strong> to fill your shape </p>


               `
             },
             {
               element: '#hideshow',
               intro: "Ok, wasn't that fun?",
               position: 'top-right-aligned'
             },
             {
               element: '#menuButton',
               intro: 'More features, more fun.',
               position: 'top'
             },
             {
               element: '#undoButton',
               intro: "Another step.",
               position: 'top'
             },
             {
               element: '#submit_button',
               intro: 'Get it, use it.'
             }
           ]
         });
         intro.start();
     }
