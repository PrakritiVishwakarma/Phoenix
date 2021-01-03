(
  function(){
    'use restrict';
    var items = [];
    var worklist = [];
    var workCompleteList = [];
    var rc = [];
    angular.module('PhoenixApp',[])
    .config(function($interpolateProvider){
      $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    })
    .controller('PhoenixSaysController',PhoenixSaysController)
    .controller('ChatController',ChatController)
    .controller('WorkController', WorkController)
    .controller('WishController',WishController)
    .controller('TimeController',TimeController)
    .controller('RecentSearchController', RecentSearchController)
    .controller('HeyuserController', HeyuserController)
    .controller('AlertController', AlertController)
    .service('PhoenixService',PhoenixService)
    .service('WorkService',WorkService)
    .service('HeyService',HeyService);

    AlertController.$inject = ['$scope','$interval'];
    function AlertController($scope,$interval) {
      var timer = 0;
      var promise;
      var alert = function(){
      if (timer === 10) {
        // console.log("hello");
        var alert = document.querySelector('#alertmsg');
        alert.innerHTML = "You Should take rest. Screen time exceeds to an hour";
        $interval.cancel(promise);
        }
        else timer = timer+1;
      }
      alert();
      promise = $interval(alert,1000);
    }

    RecentSearchController.$inject = ['PhoenixService'];
    function RecentSearchController(PhoenixService){
      var rsc = this;
      rsc.recentsearch = PhoenixService.getRecentSearch();
    }

    WishController.$inject = ['PhoenixService'];
    function WishController(PhoenixService){
      var wish = this;
      wish.greetUser = PhoenixService.greetUser;
      wish.fullwish = PhoenixService.fullgreeting;
      wish.getTime = PhoenixService.getTime;
      wish.startTime = function(){
        PhoenixService.startTime();
      }
    }

    HeyuserController.$inject = ['HeyService'];
    function HeyuserController(HeyService) {
      var hey = this;
      hey.message = HeyService.getMessage;
    }

    TimeController.$inject = ['$scope', '$interval'];
    function TimeController($scope, $interval){
      var tick = function(){
        $scope.clock = Date.now();
      }
      tick();
      $interval(tick,1000);
    }

    PhoenixSaysController.$inject=['PhoenixService'];
    function PhoenixSaysController(PhoenixService){
      var listen = this;
      listen.runSpeechRecognition = function(){
        PhoenixService.runSpeechRecognition();
      }
      listen.items = PhoenixService.getItems();
    }

    ChatController.$inject = ['PhoenixService'];
    function ChatController(PhoenixService){
      var chat = this;
      chat.items = PhoenixService.getItems();
      chat.items = items;
    }

    WorkController.$inject = ['WorkService'];
    function WorkController(WorkService){
      var work = this;
      // work.workdisplay = WorkService.displaywork();
      work.scheduleTime = function(){
        WorkService.scheduleTime();
      }
      work.getworklist = WorkService.getworklist();
      work.removeWork = function(index){
        WorkService.removeWork(index);
      }
      work.done = function(index){
        WorkService.done(index);
      }
      work.startWork = function(){
        WorkService.startWork();
      }
    }

    //HeyService----------------------------------
    function HeyService(){
      var service = this;
      var msgarr = ["One day, all your hard work will pay off.","The earlier you start working on something, the earlier you will see results.","Life is short. Live it. Fear is natural. Face it. Memory is powerful. Use it.","Do what is right, not what is easy.","We generate fears while we do nothing. We overcome these fears by taking action.","You could be the greatest you could be the best, yes you can do it","A man who dares to waste one hour of time has not discovered the value of life."];
      var turn = Math.floor(Math.random()*msgarr.length);  //0-9 nums

      service.getMessage = msgarr[turn];
    }

    //WorkService -(service)-----------------------------------------------------------------------------------
    function WorkService(){
      var service = this;
      //
      // service.displaywork = function(){
      //   if(worklist.length ===0 && workCompleteList.length ===0){
      //     return "You have not Schedule anything for Today. Start with some little tasks. How about something motivational";
      //   }
      //   else if (worklist.length ===0 && workCompleteList.length !==0) {
      //     return "Wohooo!!! You done that. You have completed all tasks for today!.";
      //   }
      //   else if (worklist.length !==0 && workCompleteList.length ===0) {
      //     return "You have"+worklist.length+" assigned today! Complete it fast and make your day super Productive! JAO PHODO";
      //   }
      //   else if (worklist.length !==0 && workCompleteList.length !==0) {
      //     return "You have"+worklist.length+" assigned today! out of Which "+workCompleteList.length+" is completed! You can do it !";
      //   }
      // }

      service.scheduleTime = function($interval){
            var nowork = document.getElementById('noOfAssign').value;
            var hours = document.getElementById('hours').value;
            var name = document.getElementById('AssignName').value;
            var nameofasign = name.split(",");
            console.log("method called");
            // NOTE:no of 1-works == no of hours 50min each    2- no of works > no of hours  3-no of works < no of hours
            if(nowork === hours) {


              for (var i = 0; i<nowork;  i++) {
                var work = {
                  no: i,
                  name: nameofasign[i],
                  time: '50min'
                }
                worklist.push(work);
               }
               console.log(worklist);
            }
            else if (hours>nowork) {
              var timeforeach = hours/nowork;console.log(timeforeach);
              for (var i = 0; i<nameofasign.length;  i++) {
                var work = {
                  no: i,
                  name: nameofasign[i],
                  time: timeforeach+" hrs"
                }
                worklist.push(work);
               }
               console.log(worklist);
            }
            else {
              var timeforeach = (hours*60)/nowork;
              for (var i = 0; i<nameofasign.length;  i++) {
                var work = {
                  no: i,
                  name: nameofasign[i],
                  time: timeforeach+" min"
                }
                worklist.push(work);
               }
               console.log(worklist);
            }
          }; //scheduleTime ends
          service.getworklist = function(){
            return worklist;
          };
          service.removeWork = function(index){
            worklist.splice(index,1);
          }
          service.done = function(index){
            var doneWork = worklist[index];
            workCompleteList.push(doneWork);
            console.log(workCompleteList);
            worklist.splice(index,1);

          }

          service.startWork = function(){
            var hours = document.getElementById('hours').value;
            var deadline = hours*60;
            var timercount = 0;

            // var start = setInterval(timer,1000);
            // function timer(){
            //   if(timercount===deadline){
            //     clearInterval(timer);
            //     var timecomplete = document.querySelector("#stopwatch");
            //     timecomplete.innerHTML = "Times Up! Hope you are done!";
            //   }
            //   else {
            //     timercount = timercount+1;
            //     console.log(timercount);
            //     var timecomplete = document.querySelector("#stopwatch");
            //     timecomplete.innerHTML = timer;
            //   }
            // }
            var myVar = setInterval(myTimer, 1000);

              function myTimer() {
                if(timercount===deadline){
                    clearInterval(myTimer);
                    var timecomplete = document.querySelector("#stopwatch");
                    timecomplete.innerHTML = "Times Up! Hope you are done!";
                  }
                  else {
                    timercount = timercount+1;
                    var timecomplete = document.querySelector("#stopwatch");
                    timecomplete.innerHTML = timercount;
                  }
              }

              function myStopFunction() {
                clearInterval(myVar);
              }
            // $interval(timer,1000);

          }
        }









    //phoenix listens-(service)------------------------------------------------------------------------------------------------

    function PhoenixService(){
      var service = this;
      var recent = "";
      const name = document.getElementById('msg').innerText;
      console.log(name);

      service.runSpeechRecognition = function(){
        var d = new Date();
        var output = document.getElementById("output");
        var action = document.getElementById("action");
        // items.push("phoenix");
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;  //because some browsers do not support it
        var recognition = new SpeechRecognition();

        recognition.onstart = function(){
              action.innerHTML = "<small>Phoenix is listening, please speak...</small>";
        };
        recognition.onspeechend = function(){
          action.innerHTML = "stopped listening, hope you are done...";
          recognition.stop();
        };
        recognition.onresult = function(event) {
           var transcript = event.results[0][0].transcript;
            if(!items.includes(transcript)){
              var usermessage = {
                user:"you",
                message: transcript
              }
              items.push(usermessage);
            }
            var confidence = event.results[0][0].confidence;
            output.innerHTML = "<b>Text:</b> " + transcript +"<br/> <b>Confidence:</b> " + confidence*100+"%";
            output.classList.remove("hide");
            textToAudio(transcript);
        };
        console.log(items);
        recognition.start();

        function textToAudio(transcript) {
            var speech = new SpeechSynthesisUtterance();
            // var name = "prakriti";
            var original = transcript;
            var bore_count=0;
            var phoenixSays =transcript.toLowerCase().split(" ");
            var m = "oops! sorry don't get it";
            // console.log(phoenixSays);
            let str = "";
            if((phoenixSays.includes("good")||phoenixSays.includes("great")) && phoenixSays.includes("work")){
              m = "thanks!";
            }

            if (phoenixSays.includes("schedule")) {
              if (phoenixSays.includes("my")&&phoenixSays.includes("work")) {
                window.scrollBy(0, 800);
                m = "Scheduling your Work . Enter your work and number of hours to complete it";
              }
            }
            if(phoenixSays.includes("feeling")){
              m="Feeling super motivated!!!!!!!";
            }
            if(phoenixSays.includes("what's")&&phoenixSays.includes("my")&&phoenixSays.includes("name")){
              m = name;
            }
            if(phoenixSays.includes("schedule")&&phoenixSays.includes("for")&&phoenixSays.includes("today")){
                  if(worklist.length ===0 && workCompleteList.length === 0){
                  m = "You Have not scheduled anything for today :(" ;
                  window.scrollTo(500,0);

                }
                else if (workCompleteList.length!==0&& worklist.length!==0) {
                  m = "You have "+worklist.length+" work for today out of which "+workCompleteList.length+" is completed.";
                }
                else{
                  var no = worklist.length;
                  m = name+" You have "+no+ " work for today";
                }
            }

            // ---------------interview------------------------------------------------
            if (phoenixSays.includes("interview")&& phoenixSays.includes("my")) {
              m = "sure"
              // interviewPreparation();
            }

            // ----------------/interview------------------------------------------------
            if(phoenixSays.includes("your")&&phoenixSays.includes("girlfriend")){
              m = "Well.. this is embarrassing that i have no girlfriend. But I have a crush on Google Assistant.. Don't tell her ;)"
            }
            // -------------------get local info-------------------------------------------
            if(phoenixSays.includes("weather")||phoenixSays.includes("temperature")){
              m = "Currently this is the weather report";
              window.open("https://www.google.com/search?q=weather&rlz=1C1CHWL_enIN921IN921&oq=weath&aqs=chrome.1.69i57j0i131i433j69i59j0i131i433j0j0i433j0j0i433.8133j1j7&sourceid=chrome&ie=UTF-8");
              var recent = "https://www.google.com/search?q=weather&rlz=1C1CHWL_enIN921IN921&oq=weath&aqs=chrome.1.69i57j0i131i433j69i59j0i131i433j0j0i433j0j0i433.8133j1j7&sourceid=chrome&ie=UTF-8";
              var s = {
                head: "weather",
                link: recent
              }
              rc.push(s);
            }
            // =====================/get local info========================================
            if(phoenixSays.includes("introduce")){if(phoenixSays.includes("you")||phoenixSays.includes("yourself")){m="ok!.ahum. My name is phoenix. Your assistant. You can ask me to do anything like scheduling your work and reading a book. You can also ask me to search anything. I am still learning. I like cookies by the way!"} }
            if(phoenixSays.includes("hai")||phoenixSays.includes("you")){
              if (phoenixSays.includes("do")&&phoenixSays.includes("for")&&phoenixSays.includes("me")) {
                m="Plenty of things!. I can do searching in browser and let you know about your schedule work. If you got bored I'll play your playlist. What else you want me to do?";
              }
              else{m= "Hi "+name+"!..My name is Phoenix. What can I do for you";}

            }
            if(phoenixSays.includes("phoenix") ){if(phoenixSays.includes('hi')){ m = "Hi!. What can i do for u";}
                                                  else {m = "yes. that's me!Phoenix. What you want me to do "+name+"?";}}
            if(phoenixSays.includes("bore")||phoenixSays.includes("bored")||phoenixSays.includes("tired")||phoenixSays.includes("boring")){if (phoenixSays.includes("you")) {
              if (bore_count<2) {
                  m="Not bored yet.Here the things you can listen to";
                  window.open("https://www.youtube.com/playlist?list=WL");
                  bore_count+=1;
                  console.log(bore_count);
              }
              else{
                  m="umm.. Little bored";
                  bore_count--;
              }
            }
            else if (phoenixSays.includes("i")) {
              m="ooh. here are the things we can do "+name+". You can watch movies or music or can do some pending work. just say search movies. ";
              window.open("https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ","_blank")
            }
          }
        //   if(phoenixSays.includes("schedule")&&phoenixSays.includes("work")&&phoenixSays.includes("me")){m = "okay!"; window.scrollTo(0,document.querySelector("#section1").scrollHeight);
        //   m = "how many works do you have";
        // }
          if(phoenixSays.includes("read")&&phoenixSays.includes("book")&&phoenixSays.includes("me")){m="Sure!. Enter content and i will read it for you!"; window.scrollTo(0,document.querySelector("#section2").scrollHeight);}
            if(phoenixSays.includes("search")){
              if(phoenixSays.length+1===undefined) m = "Search What?"
              m ="Sure.";
              for(let i=0; i<phoenixSays.length; i++){

                str=str.concat(phoenixSays[i].toString());
                if(i!=phoenixSays.length-1) str = str.concat("%20");
              }
              m = "Here's what i found from web"
              window.open("https://www.google.com/search?q="+str,"_blank");
              recent = "https://www.google.com/search?q="+str;
              var s = {
                head: phoenixSays.toString().replace(','," "),
                link: recent
              }
              rc.push(s);
              // console.log(phoenixSays.toString().replace(","," "));
            }
            if(phoenixSays.includes("open")&& phoenixSays.indexOf("open") === 0){
              var open = phoenixSays;
              open.splice("open",1);
              open = open.toString();
              // console.log(open);
              m = "Opening "+open;
              recent= 'https://'+open;
              var s = {
                head: phoenixSays.toString().replace(/[,] /g,' '),
                link: recent
              }
              rc.push(s);
              window.open('https://'+open,'_blank');
            }
            if(phoenixSays.includes("add")&&phoenixSays.indexOf("add")===0){

            }
            if(phoenixSays.includes("play")&&phoenixSays.indexOf("play") ===0){
              if(phoenixSays.includes("music")){

              }
              if(phoenixSays.includes("playlist")||(phoenixSays.includes("anything")&&phoenixSays.includes("you")&&phoenixSays.includes("want"))){
                m = "ok! here is from your playlist";
                window.open("https://music.youtube.com/watch?v=NuB-1myGido&list=PL7Als281wGy2xOrIMdNICMbX6noFYLzmK");
              }
              if(!phoenixSays.includes("music")&&!phoenixSays.includes("playlist")){
                var play = phoenixSays;
                play.splice("play",1);
                play = play.toString();
                m = "Playing"+play+" on youtube";
                recent = "https://www.youtube.com/results?search_query="+play;
                var s = {
                  head: phoenixSays.toString().replace(","," "),
                  link: recent
                }
                rc.push(s);
                window.open("https://www.youtube.com/results?search_query="+play,"_blank");
              }

            }


            speech.text = m; if(!items.includes(m)){
              var phoenixmessage = {
                user: "Phoenix",
                message: m
              }
              items.push(phoenixmessage);
            }
            output.innerHTML = m;

            //----------default functioning of Phoenix voice--------------
            // console.log(phoenixSays.length);
            //default volume
            speech.lang = "en-US";
            speech.volume = 4;
            speech.rate = 1;
            speech.pitch = 1 ;


            window.speechSynthesis.speak(speech);
        }
//phoenixSays-------------------------------------------------------------------------------------------------------

      }//runSpeechRecognition ends here
      service.getRecentSearch = function(){
        return rc;
      }
      service.getItems = function(){
        return items;
      }

      var day = new Date();
      var wish = "";
      var hr = day.getHours();
      if (hr >= 0 && hr < 12) {
          wish = "Good Morning";
          fullwish = "Rise and Shine. Let's make this day super productive";
      } else if (hr == 12) {
          wish = "Good Noon";
          fullwish="What you doin' ? How about completing some small tasks."
      } else if (hr >= 12 && hr <= 17) {
          wish = "Good Afternoon";
          fullwish = "How'd you doing. Ready to make a blast?";
      } else {
          wish = "Good Evening";
          fullwish = "Hope you have a Productive Day."
      }
        console.log(wish);
        var min = day.getMinutes();
        var time = hr+":"+min;

      service.greetUser = wish;
      service.fullgreeting = fullwish;
      service.getTime = time;

      service.startTime = function(){
          var today = new Date();
          var h = today.getHours();
          var m = today.getMinutes();
          var s = today.getSeconds();
          m = checkTime(m);
          s = checkTime(s);
          document.getElementById('time').innerHTML = h + ":" + m ;
          console.log(s);
          var t = setTimeout(startTime, 500);
      }
      function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
      }
  }//service ends here
  // function interviewPreparation() {
  //   console.log("hello from interviewPreparation");
  //   var speech = new SpeechSynthesisUtterance();
  //   speech.lang = "en-US";
  //   speech.volume = 4;
  //   speech.rate = 1;
  //   speech.pitch = 1 ;
  //   var m = "";
  //
  //
  //   window.speechSynthesis.speak(speech);
  //
  //
  // }


  }
)();
