
  window.onload = function() {
  const button = document.querySelector('button');
  button.addEventListener('click',()=>{
       var speech = new SpeechSynthesisUtterance();
     var wish = "";
     var day = new Date();
         var hr = day.getHours();
         if (hr >= 0 && hr < 12) {
             wish = "Good Morning!";
         } else if (hr == 12) {
             wish = "Good Noon!";
         } else if (hr >= 12 && hr <= 17) {
             wish = "Good Afternoon!";
         } else {
             wish = "Good Evening!";
         }
     var msg = new SpeechSynthesisUtterance(wish + "I am Phoenix. Your Assistant. Hope you have a Wonderful day !.");
     console.log(msg);
     console.log("hello");
     speech.lang = "en-US";
     speech.volume = 4;
     speech.rate = 1;
     speech.pitch = 1 ;
     speechSynthesis.speak(msg);
  }
)
};
