  var ctx;
  var playLoop;
  var fps = 30;
  var canvasH;
  var canvasW;
  var space = false;
  var mouse = false;
  var mouseX;
  var mouseY;
  var game = {state : "menu", level : 1, currentLevel : 1, pause : false, tileSize : 48, maxTileSize : 64, rows : 15, cols : 15, pdeath1 : false, pdeath2 : false, outcome : "none"};
  //cannot be less than 6X6 board
  var pcoord1  = {};
  var pcoord2 = {};
  var hcoord = {};
  var mcoord1 = {};
  var mcoord2 = {};
  var mcoord3 = {};
  var death = false;
  var board = [];

  //monsters
  var monster1 = {board : [], movementTime : 1, movementTimeCounter : 0, trapped : false, active : false};
  var monster2 = {board : [], movementTime : 1, movementTimeCounter : 0, trapped : false, active : false};
  var monster3 = {board : [], movementTime : 3, movementTimeCounter : 0, trapped : false, active : false};
  var heart = {onTime : 7, offTime : 5, on : false, timeCounter : 0};

  function gameLoop()
  {
      update();
      render();
  }
  function play()
  {
      //initBoard(1);
      playLoop = setInterval(function() {gameLoop();} , 1000/fps);
  }

  document.onkeydown =
      function mRect(e)
      {
          e = e || window.event;
          console.log(e.keyCode);
          if (e.keyCode == '68' )
          {
              movementResolver("right", 2);
          }
          if (e.keyCode == '65' )
          {
               movementResolver("left", 2);
          }
          if (e.keyCode == '83' )
          {
               movementResolver("down", 2)
          }
          if (e.keyCode == '87' )
          {
               movementResolver("up", 2)
          }
          if (e.keyCode == '39' )
          {
              movementResolver("right", 1)
          }
          if (e.keyCode == '37' )
          {
               movementResolver("left", 1)
          }
          if (e.keyCode == '40' )
          {
               movementResolver("down", 1)
          }
          if (e.keyCode == '38' )
          {
               movementResolver("up", 1)
          }
          if(e.keyCode == '32')
          {
            space = true;
          }
          if(e.keyCode == '80' && game.state == "game")
          {
            game.pause = !game.pause;
          }
          if(e.keyCode == '81' || e.keyCode == '27'  && game.state == "game")
          {
            game.state = "menu";
          }
          if(e.keyCode == '82'  && game.state == "game")
          {
            startLevel(game.currentLevel);
          }
      }
   document.onkeyup =
      function mRect(e)
      {
          e = e || window.event;
          if(e.keyCode == '32')
          {
            space = false;
          }
      }
  function sizeAdjust()
  {
      canvas = document.getElementById("mycanvas");

      //Taken from stack overflow -  https://stackoverflow.com/questions/4037212/html-canvas-full-screen
      canvasW = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;
      canvasH = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
      //

      canvasH = canvasH - 15;
      canvasW = canvasW - 5;
      canvasH = canvasH - (canvasH % 2);
      canvasW = canvasW - (canvasW % 2);
      if(canvasW > 1500)
          canvasW = 1500;
      if(canvasH > 800)
          canvasH = 800;
      if(canvas.width != canvasW)
          {
          canvas.width = canvasW;
          }
      if(canvas.height != canvasH)
          {
          canvas.height = canvasH;
          }

      game.tileSize = canvasH/game.rows;
      if(game.tileSize > canvasW/game.cols)
          game.tileSize = canvasW/game.cols;
      if(game.tileSize > game.maxTileSize)
        game.tileSize = game.maxTileSize;
  }

  window.onload =
      function Game()
      {
          sizeAdjust();
          document.body.style.marginTop = 0;
          document.body.style.marginLeft = 0;
          document.body.style.marginBottom = 0;
          document.body.style.marginUp = 0;

          this.ctx = document.getElementById("mycanvas").getContext("2d");
          play();

      }
   document.onmousedown =
      function mousedown(e)
      {
          e = e || window.event;
          mouse = true;
      }
  document.onmouseup =
      function mouseup(e)
      {
          e = e || window.event;
          mouse = false;
      }
  window.addEventListener('mousemove', function (e) {
      //canvas = document.getElementById("mycanvas");
      mouseX = e.pageX;
      mouseY = e.pageY;
  })
