  function update()
  {
    //console.log(game.pause);
    //if(document.getElementById("hgr-promo-widget").outerHTML != null)
      //document.getElementById("hgr-promo-widget").outerHTML = "";

      sizeAdjust();
      if(game.state == "game" && !game.pause)
      {
        document.getElementById("mycanvas").style.cursor = "auto";

        checkWin();
        checkLose();

        if(game.outcome != "none")
          return;

        if(monster1.active)
          updateMonster1();
        if(monster2.active)
          updateMonster2();
        if(monster3.active)
          updateMonster3();

        updateHeart();

      }
      if(game.state == "game" && game.pause)
      {
        updatePause();
      }
      if(game.state == "menu")
      {
        updateMenu();
      }
      if(death == true)
      {
        clearInterval(playLoop);
      }
  }
  function checkLose()
  {
    if(!(game.pdeath1 && game.pdeath2))
      return false;
    game.pause = true;
    game.outcome = "lose";
    return true;
  }
  function checkWin()
  {
    if(monster1.active && !monster1.trapped)
      return false;
    if(monster2.active && !monster2.trapped)
      return false;
    if(monster3.active && !monster3.trapped)
      return false;
    if(game.pdeath1 && game.pdeath2)
      return false;

    game.pause = true;
    game.outcome = "win";
    if(game.level < game.currentLevel + 1)
      game.level = game.currentLevel + 1;
    return true;
  }
  function updatePause()
  {
    var size = {x : game.cols * game.tileSize, y : game.rows * game.tileSize};

    var offsetX = (canvasW - size.x)/2;
    var offsetY = (canvasH - size.y)/2;

    var yspace = 3*size.y/4;

    document.getElementById("mycanvas").style.cursor = "auto";
    for(var i = 0; i < 3; i++)
    {
      if(isMouseOver(offsetX + size.x/11, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7, 9*size.x/11, size.x/7))
        {
          document.getElementById("mycanvas").style.cursor = "pointer";
          if(mouse == false)
            continue;
          if(i == 0 && game.outcome == "none")
          {
            game.pause = false;
          }
          if(i == 1)
          {
            startLevel(game.currentLevel);
          }
          if(i == 2)
          {
            game.state = "menu";
          }
        }
    }
  }
  function updateMenu()
  {
    var size = getSizeFit(1/(741.0/754.0) , canvasW, canvasH);
    var offsetX = (canvasW - size.x)/2;
    var offsetY = (canvasH - size.y)/2;
    var size2 = getSizeFit(186.0/1635.0 , size.x*7/8, size.y/4);
    var offsetX2 = (canvasW - size2.x)/2;
    var offsetY2 = (size.y/3 - size2.y)/2;
    var yspace = 3*size.y/4;
    var add;

    document.getElementById("mycanvas").style.cursor = "auto";
    for(var i = 0; i < 3; i++)
    {
      for(var j = 0; j < 3; j++)
      {
        if(isMouseOver(offsetX + 2*j*size.x/7 + size.x/7, offsetY + size.y/4 + 2*i*yspace/7 + yspace/7, size.x/7, size.x/7))
          {
            document.getElementById("mycanvas").style.cursor = "pointer";
            if(mouse == true)
            {
              startLevel((i*3)+(j+1));
            }
          }
      }
    }
  }
  function updateHeart()
  {
    heart.timeCounter++;
    if(heart.on == true && heart.timeCounter > heart.onTime*fps)
    {
      heart.timeCounter = 0;
      setBoard(hcoord, 0);
      heart.on = false;
    }
    if(heart.on == false && heart.timeCounter > heart.offTime*fps)
    {
      heart.timeCounter = 0;
      setHeart();
      heart.on = true;
    }

  }
  function setHeart()
  {
    var emptyCount = 0;
    for(var i = 0; i < game.rows; i++)
        {
            for(var j = 0; j < game.cols; j++)
                {
                    if(board[i][j] == 0)
                        emptyCount++;
                }
        }

    var rand = Math.floor(Math.random()*emptyCount);
    emptyCount = 0;
    for(var i = 0; i < game.rows; i++)
        {
            for(var j = 0; j < game.cols; j++)
                {
                    if(board[i][j] == 0)
                        emptyCount++;
                    if(emptyCount == rand)
                    {
                      hcoord.x = i;
                      hcoord.y = j;
                      setBoard(hcoord, -4);
                      return;
                    }
                }
        }
  }
  function isTrapped(coord)
  {
    if(getBoard(getNewCoordinate(coord, "up")) != 0 && getBoard(getNewCoordinate(coord, "down")) != 0 && getBoard(getNewCoordinate(coord, "left")) != 0 && getBoard(getNewCoordinate(coord, "right")) != 0)
        return true;
    return false;
  }
  function flipDirection(direction)
  {
      if(direction == "up")
        return "down";
      if(direction  == "down")
        return "up";
      if(direction == "right")
        return "left";
      if(direction == "left")
        return "right"
  }
  function updateMonster3()
  {
      monster3.movementTimeCounter++;
      if(monster3.movementTimeCounter> monster3.movementTime * fps)
          {
              moveMonsterRandom3();
              monster3.movementTimeCounter = 0;
          }
      monster3.trapped = isTrapped(mcoord3);

  }
  function moveMonsterRandom3()
  {
    var directions = [];
    if(getBoard(getNewCoordinate(mcoord3, "up")) == 0)
      directions.push("up");
    if(getBoard(getNewCoordinate(mcoord3, "down")) == 0)
      directions.push("down");
    if(getBoard(getNewCoordinate(mcoord3, "left")) == 0)
      directions.push("left");
    if(getBoard(getNewCoordinate(mcoord3, "right")) == 0)
      directions.push("right");

    if(cEquals(pcoord1, getNewCoordinate(mcoord3, "up")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord3, "up")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord3, "left")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord3, "left")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord3, "down")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord3, "down")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord3, "right")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord3, "right")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(directions.length == 0)
      return false;

    var direction = directions[Math.floor(Math.random()*directions.length)];
    setBoard(mcoord3, 0);
    mcoord3 = getNewCoordinate(mcoord3, direction);
    setBoard(mcoord3, -5);

    return true;
  }
  function updateMonster1()
  {
      monster1.movementTimeCounter++;
      if(monster1.movementTimeCounter> monster1.movementTime * fps)
          {
              moveMonster1();
              monster1.movementTimeCounter = 0;
          }
      monster1.trapped = isTrapped(mcoord1);

  }
  function moveMonsterRandom1()
  {
    var directions = [];
    if(getBoard(getNewCoordinate(mcoord1, "up")) == 0)
      directions.push("up");
    if(getBoard(getNewCoordinate(mcoord1, "down")) == 0)
      directions.push("down");
    if(getBoard(getNewCoordinate(mcoord1, "left")) == 0)
      directions.push("left");
    if(getBoard(getNewCoordinate(mcoord1, "right")) == 0)
      directions.push("right");

    if(cEquals(pcoord1, getNewCoordinate(mcoord1, "up")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord1, "up")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord1, "left")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord1, "left")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord1, "down")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord1, "down")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord1, "right")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord1, "right")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }

    if(directions.length == 0)
      return false;

    var direction = directions[Math.floor(Math.random()*directions.length)];
    setBoard(mcoord1, 0);
    mcoord1 = getNewCoordinate(mcoord1, direction);
    setBoard(mcoord1, -5);

    return true;
  }
  function moveMonster1()
  {
      for(var i = 0; i < game.rows; i++)
          {
              monster1.board[i] = [];
              for(var j = 0; j < game.cols; j++)
                  {
                      if(board[i][j] == 0)
                          monster1.board[i][j] = 0;
                      else
                          monster1.board[i][j] = -1;
                  }
          }

      monster1.board[mcoord1.x][mcoord1.y] = 0;
      if(game.pdeath1 == false)
        monster1.board[pcoord1.x][pcoord1.y] = 0;
      if(game.pdeath2 == false)
        monster1.board[pcoord2.x][pcoord2.y] = 0;

      recursiveFillMonster1(mcoord1, 1);

      if((monster1.board[pcoord1.x][pcoord1.y] == 0 || game.pdeath1 == true) && (monster1.board[pcoord2.x][pcoord2.y] == 0 || game.pdeath2 == true))
          return moveMonsterRandom1();

      var target = {x :  pcoord1.x, y : pcoord1.y};
      if(monster1.board[pcoord1.x][pcoord1.y] == 0 || game.pdeath1 == true)
          target = {x :  pcoord2.x, y : pcoord2.y};
      else if(!(monster1.board[pcoord2.x][pcoord2.y] == 0 || game.pdeath2 == true) && monster1.board[pcoord2.x][pcoord2.y] < monster1.board[pcoord1.x][pcoord1.y])
          target = {x :  pcoord2.x, y : pcoord2.y};

      console.log("Target: " + target.x  + " , " + target.y);

      //get direction of movement
      var direction;
      var currentDist;
      while(monster1.board[target.x][target.y] != 1)
          {
              currentDist = monster1.board[target.x][target.y];
              if(monster1.board[getNewCoordinate(target, "up").x][getNewCoordinate(target, "up").y] == monster1.board[target.x][target.y] - 1)
                  direction = "up";
              else if(monster1.board[getNewCoordinate(target, "down").x][getNewCoordinate(target, "down").y] == monster1.board[target.x][target.y] - 1)
                  direction = "down";
              else if(monster1.board[getNewCoordinate(target, "left").x][getNewCoordinate(target, "left").y] == monster1.board[target.x][target.y] - 1)
                  direction = "left";
              else if(monster1.board[getNewCoordinate(target, "right").x][getNewCoordinate(target, "right").y] == monster1.board[target.x][target.y] - 1)
                  direction = "right";
              else
                  {
                      console.log("MONSTER1 MOVEMENT FAIL");
                      return moveMonsterRandom1();
                  }
              target = getNewCoordinate(target, direction);
          }


      console.log(monster1.board[pcoord1.x][pcoord1.y] + " " + monster1.board[pcoord2.x][pcoord2.y]);

      direction = flipDirection(direction);

      if(getBoard(getNewCoordinate(mcoord1, direction)) == -1)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
      if(getBoard(getNewCoordinate(mcoord1, direction)) == -2)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }

      setBoard(mcoord1, 0);
      mcoord1 = getNewCoordinate(mcoord1, direction);
      setBoard(mcoord1, -5);


  }
  function recursiveFillMonster1(coord, distance)
  {

      var tempCoord = {x : coord.x, y : coord.y};

      if(monster1.board[tempCoord.x][tempCoord.y] != 0 && monster1.board[tempCoord.x][tempCoord.y] <= distance)
          return false;

      //set distance
      monster1.board[tempCoord.x][tempCoord.y] = distance;

      p1 = recursiveFillMonster1(getNewCoordinate(tempCoord, "up"), distance +1);
      p2 = recursiveFillMonster1(getNewCoordinate(tempCoord, "down"), distance +1);
      p3 = recursiveFillMonster1(getNewCoordinate(tempCoord, "left"), distance +1);
      p4 = recursiveFillMonster1(getNewCoordinate(tempCoord, "right"), distance +1);

      return (p1 || p2 || p3 || p4);
  }
  function updateMonster2()
  {
      monster2.movementTimeCounter++;
      if(monster2.movementTimeCounter> monster2.movementTime * fps)
          {
              moveMonster2();
              monster2.movementTimeCounter = 0;
          }
      monster2.trapped = isTrapped(mcoord2);

  }
  function moveMonsterRandom2()
  {
    var directions = [];
    if(getBoard(getNewCoordinate(mcoord2, "up")) == 0)
      directions.push("up");
    if(getBoard(getNewCoordinate(mcoord2, "down")) == 0)
      directions.push("down");
    if(getBoard(getNewCoordinate(mcoord2, "left")) == 0)
      directions.push("left");
    if(getBoard(getNewCoordinate(mcoord2, "right")) == 0)
      directions.push("right");

    if(cEquals(pcoord1, getNewCoordinate(mcoord2, "up")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord2, "up")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord2, "left")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord2, "left")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord2, "down")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord2, "down")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }
    if(cEquals(pcoord1, getNewCoordinate(mcoord2, "right")) && game.pdeath1 == false)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
    if(cEquals(pcoord2, getNewCoordinate(mcoord2, "right")) && game.pdeath2 == false)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }

    if(directions.length == 0)
      return false;

    var direction = directions[Math.floor(Math.random()*directions.length)];
    setBoard(mcoord2, 0);
    mcoord2 = getNewCoordinate(mcoord2, direction);
    setBoard(mcoord2, -5);

    return true;
  }
  function moveMonster2()
  {
      for(var i = 0; i < game.rows; i++)
          {
              monster2.board[i] = [];
              for(var j = 0; j < game.cols; j++)
                  {
                      if(board[i][j] == 0)
                          monster2.board[i][j] = 0;
                      else
                          monster2.board[i][j] = -1;
                  }
          }

      monster2.board[mcoord2.x][mcoord2.y] = 0;
      if(game.pdeath1 == false)
        monster2.board[pcoord1.x][pcoord1.y] = 0;
      if(game.pdeath2 == false)
        monster2.board[pcoord2.x][pcoord2.y] = 0;

      recursiveFillMonster2(mcoord2, 1);

      if((monster2.board[pcoord1.x][pcoord1.y] == 0 || game.pdeath1 == true) && (monster2.board[pcoord2.x][pcoord2.y] == 0 || game.pdeath2 == true))
          return moveMonsterRandom2();

      var target = {x :  pcoord1.x, y : pcoord1.y};
      if(monster2.board[pcoord1.x][pcoord1.y] == 0 || game.pdeath1 == true)
          target = {x :  pcoord2.x, y : pcoord2.y};
      else if(!(monster2.board[pcoord2.x][pcoord2.y] == 0 || game.pdeath2 == true) && monster2.board[pcoord2.x][pcoord2.y] < monster2.board[pcoord1.x][pcoord1.y])
          target = {x :  pcoord2.x, y : pcoord2.y};

      console.log("Target: " + target.x  + " , " + target.y);

      //get direction of movement
      var direction;
      var currentDist;
      while(monster2.board[target.x][target.y] != 1)
          {
              currentDist = monster2.board[target.x][target.y];
              if(monster2.board[getNewCoordinate(target, "up").x][getNewCoordinate(target, "up").y] == monster2.board[target.x][target.y] - 1)
                  direction = "up";
              else if(monster2.board[getNewCoordinate(target, "down").x][getNewCoordinate(target, "down").y] == monster2.board[target.x][target.y] - 1)
                  direction = "down";
              else if(monster2.board[getNewCoordinate(target, "left").x][getNewCoordinate(target, "left").y] == monster2.board[target.x][target.y] - 1)
                  direction = "left";
              else if(monster2.board[getNewCoordinate(target, "right").x][getNewCoordinate(target, "right").y] == monster2.board[target.x][target.y] - 1)
                  direction = "right";
              else
                  {
                      console.log("monster2 MOVEMENT FAIL");
                      return moveMonsterRandom2();
                  }
              target = getNewCoordinate(target, direction);
          }


      console.log(monster2.board[pcoord1.x][pcoord1.y] + " " + monster2.board[pcoord2.x][pcoord2.y]);

      direction = flipDirection(direction);

      if(getBoard(getNewCoordinate(mcoord2, direction)) == -1)
      {
        setBoard(pcoord1, -3);
        game.pdeath1 = true;
        return;
      }
      if(getBoard(getNewCoordinate(mcoord2, direction)) == -2)
      {
        setBoard(pcoord2, -3);
        game.pdeath2 = true;
        return;
      }

      setBoard(mcoord2, 0);
      mcoord2 = getNewCoordinate(mcoord2, direction);
      setBoard(mcoord2, -5);


  }
  function recursiveFillMonster2(coord, distance)
  {

      var tempCoord = {x : coord.x, y : coord.y};

      if(monster2.board[tempCoord.x][tempCoord.y] != 0 && monster2.board[tempCoord.x][tempCoord.y] <= distance)
          return false;

      //set distance
      monster2.board[tempCoord.x][tempCoord.y] = distance;

      p1 = recursiveFillMonster2(getNewCoordinate(tempCoord, "up"), distance +1);
      p2 = recursiveFillMonster2(getNewCoordinate(tempCoord, "down"), distance +1);
      p3 = recursiveFillMonster2(getNewCoordinate(tempCoord, "left"), distance +1);
      p4 = recursiveFillMonster2(getNewCoordinate(tempCoord, "right"), distance +1);

      return (p1 || p2 || p3 || p4);
  }
