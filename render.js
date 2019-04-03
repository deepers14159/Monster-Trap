//****************************************************************
//                 CODE FROM FILE "render.js".
//
// This file has all the functions that handle rendering different
// screens of the game on the HTML canvas.
//****************************************************************

  function render()
  {
      resetRender();

      if(game.state == "game" && !game.pause)
      {
        renderGameBoard();
      }
      if(game.state == "game" && game.pause)
      {
          renderGameBoard();
          renderPause();
      }
      if(game.state == "menu")
        renderMenu();
  }
  function renderPause()
  {
    var size = {x : game.cols * game.tileSize, y : game.rows * game.tileSize};

    var offsetX = (canvasW - size.x)/2;
    var offsetY = (canvasH - size.y)/2;

    //////////////////////////////////////////////////////////

    var size2;
    if(game.outcome == "none")
      size2 = getSizeFit(180.0/765.0 , size.x*7/8, size.y/4);
    if(game.outcome == "win")
      size2 = getSizeFit(185.0/1643.0 , size.x*7/8, size.y/4);
    if(game.outcome == "lose")
      size2 = getSizeFit(185.0/1140.0 , size.x*7/8, size.y/4);

    var offsetX2 = (canvasW - size2.x)/2;
    var offsetY2 = (size.y/3 - size2.y)/2;

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#000000";
    ctx.fillRect(offsetX2-size.x/16, offsetY + offsetY2-size.x/16, size2.x+size.x/8, size2.y+size.x/8);
    ctx.globalAlpha = 1;

    var img;
    if(game.outcome == "none")
      img = document.getElementById("pausedtext");
    if(game.outcome == "win")
      img = document.getElementById("clearedtext");
    if(game.outcome == "lose")
      img = document.getElementById("againtext");

    ctx.drawImage(img, offsetX2, offsetY + offsetY2, size2.x, size2.y);

    ////////////////////////////////////////////////////////////


    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "#222266";
    ctx.fillRect(offsetX, offsetY, size.x, size.y);

    var yspace = 3*size.y/4;
    var add;
    for(var i = 0; i < 3; i++)
    {
      if(isMouseOver(offsetX + size.x/11, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7, 9*size.x/11, size.x/7))
        add = 15;
      else {
        add = 0;
      }

      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#FF007F";
      ctx.lineWidth = 5;
      ctx.fillRect(offsetX + size.x/11 - add/2, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7 - add/2, 9*size.x/11 + add, size.x/7 + add);

      ctx.globalAlpha = 0.7;
      ctx.strokeRect(offsetX + size.x/11 - add/2, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7 - add/2, 9*size.x/11 + add, size.x/7 + add);

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#F5F119";
      ctx.textAlign = "center";

      ctx.font = "32px Verdana";
      if(add > 0)
        ctx.font = "37px Verdana";

      var text;
      if(i == 0)
        text = "Resume 'p'";
      if(i == 1)
        text = "Restart 'r'";
      if(i == 2)
        text = "Quit 'q'";
      ctx.fillText(text,  offsetX + size.x/2, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7 + size.x/14 + 11);
    }
    ctx.globalAlpha = 1;
  }
  function renderMenu()
  {

    var size = getSizeFit(1/(741.0/754.0) , canvasW, canvasH);

    var offsetX = (canvasW - size.x)/2;
    var offsetY = (canvasH - size.y)/2;


    ctx.globalAlpha = 0.7;
    img = document.getElementById("title");
    ctx.drawImage(img, offsetX, offsetY, size.x, size.y);

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "#222266";
    ctx.fillRect(offsetX, offsetY, size.x, size.y);

    //////////////////////////////////////////////////////////

    var size2 = getSizeFit(186.0/1635.0 , size.x*7/8, size.y/4);

    var offsetX2 = (canvasW - size2.x)/2;
    var offsetY2 = (size.y/3 - size2.y)/2;

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#000000";
    ctx.fillRect(offsetX2-size.x/16, offsetY + offsetY2-size.x/16, size2.x+size.x/8, size2.y+size.x/8);
    ctx.globalAlpha = 1;

    var img = document.getElementById("titletext");
    ctx.drawImage(img, offsetX2, offsetY + offsetY2, size2.x, size2.y);

    ////////////////////////////////////////////////////////////


    var yspace = 3*size.y/4;
    var add;
    for(var i = 0; i < 3; i++)
    {
      /*
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#FF007F";
      ctx.lineWidth = 5;
      ctx.fillRect(offsetX, offsetY + size.y/4 + 2*i*yspace/11 + yspace/11, size.x, size.x/11);
      */
      for(var j = 0; j < 3; j++)
      {
        if(isMouseOver(offsetX + 2*j*size.x/7 + size.x/7, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7, size.x/7, size.x/7))
          add = 15;
        else {
          add = 0;
        }

        ctx.globalAlpha = 0.7;
        if((i*3)+(j+1) <= game.level)
          ctx.globalAlpha = 0.7;
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#FF007F";
        ctx.lineWidth = 5;
        ctx.fillRect(offsetX + 2*j*size.x/7 + size.x/7 - add/2, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7 - add/2, size.x/7 + add, size.x/7 + add);

        ctx.globalAlpha = 0.7;
        if((i*3)+(j+1) <= game.level)
        {
          ctx.globalAlpha = 0.5;
          if((i*3)+(j+1) == game.level)
            ctx.globalAlpha = 1;
          ctx.strokeRect(offsetX + 2*j*size.x/7 + size.x/7 - add/2, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7 - add/2, size.x/7 + add, size.x/7 + add);
        }
        ctx.globalAlpha = 0.7;
        if((i*3)+(j+1) <= game.level)
          ctx.globalAlpha = 1;
        ctx.fillStyle = "#F5F119";
        ctx.textAlign = "center";

        ctx.font = "32px Verdana";
        if(add > 0)
          ctx.font = "37px Verdana";
        ctx.fillText(((i*3)+(j+1)) + "",  offsetX + 2*j*size.x/7 + size.x/7 + size.x/14, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7 + size.x/14+10);
      }
    }
    ctx.globalAlpha = 1;

  }
  function isMouseOver(x , y, w, h)
  {
    if(mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h)
      return true;
    return false;
  }
  function getSizeFit(ratio, maxW, maxH)
  {
    var height1 = ratio * maxW;
    var width1 = maxW;
    if(height1 > maxH)
    {
      height1 = maxH;
      width1 = maxH / ratio;
    }
    return {x : width1, y : height1};
  }
  function renderGameBoard()
  {
    var offsetX = (canvasW - game.cols*game.tileSize)/2;
    var offsetY = (canvasH - game.rows*game.tileSize)/2;

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#1B1B1B";
    ctx.fillRect(offsetX, offsetY, game.cols*game.tileSize, game.rows*game.tileSize);

      var img;
      for(var i = 0; i < game.rows; i++)
          {
              for(var j = 0; j < game.cols; j++)
                  {
                      if(board[i][j] == 1)
                          img = document.getElementById("bluetile");
                      else if(board[i][j] == 2)
                          img = document.getElementById("redtile");
                      else if(board[i][j] == 3)
                          img = document.getElementById("greentile");
                      else if(board[i][j] == 4)
                          img = document.getElementById("purpletile");
                      else if(board[i][j] == 5)
                          img = document.getElementById("orangetile");
                      else if(board[i][j] == -1)
                          img = document.getElementById("player1");
                      else if(board[i][j] == -2)
                          img = document.getElementById("player2");
                      else if(board[i][j] == -3)
                          img = document.getElementById("x");
                      else if(board[i][j] == -4)
                          img = document.getElementById("heart");
                      else if(board[i][j] == -5)
                          img = document.getElementById("monster");
                      else
                      {
                        /*
                        ctx.fillStyle = "#FFFFFF";
                        ctx.font = "10px Georgia";
                        ctx.fillText(i + " , " + j, game.tileSize*j + 5, game.tileSize*i + 5);
                        */
                        continue;
                      }
                      ctx.drawImage(img, game.tileSize*j+offsetX, game.tileSize*i+offsetY, game.tileSize, game.tileSize);
                      /*
                      ctx.fillStyle = "#FFFFFF";
                      ctx.font = "10px Georgia";
                      ctx.fillText(i + " , " + j, game.tileSize*j + 5, game.tileSize*i + 5);
                      */
                  }
          }

  }
  function resetRender()
  {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvasW, canvasH);
  }
