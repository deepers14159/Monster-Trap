  function startLevel(level)
  {
    if(level > game.level)
      return;

    game.currentLevel = level;
    game.state = "game";
    game.outcome = "none";
    game.pause = false;
    game.pdeath1 = false;
    game.pdeath2 = false;

    monster1.active = false;
    monster2.active = false;
    monster3.active = false;

    monster1.trapped = false;
    monster2.trapped = false;
    monster3.trapped = false;

    heart.on = false;
    heart.timeCounter = 0;

    if(level == 1)
    {
      monster3.active = true;
      monster3.movementTime = 0.75;
      initBoard([10, 4, 0, 0, 0, 0]);
    }
    if(level == 2)
    {
      monster3.active = true;
      monster3.movementTime = 0.5;
      initBoard([10, 4, 1, 0, 0, 0]);
    }
    if(level == 3)
    {
      monster1.active = true;
      monster1.movementTime = 1;
      initBoard([10, 0, 0, 3, 0, 0]);
    }
    if(level == 4)
    {
      monster1.active = true;
      monster1.movementTime = 0.75;
      initBoard([10, 0, 3, 0, 2, 0]);
    }
    if(level == 5)
    {
      monster3.active = true;
      monster3.movementTime = 1;
      monster2.active = true;
      monster2.movementTime = 1;
      initBoard([10, 1, 0, 1, 0, 0]);
    }
    if(level == 6)
    {
      monster1.active = true;
      monster1.movementTime = 0.3;
      initBoard([10, 1, 1, 1, 0, 0]);
    }
    if(level == 7)
    {
      monster3.active = true;
      monster3.movementTime = 0.3;
      initBoard([10, 1, 0, 0, 0, 0]);
    }
    if(level == 8)
    {
      monster1.active = true;
      monster1.movementTime = 1;
      monster2.active = true;
      monster2.movementTime = 1;
      monster3.active = true;
      monster3.movementTime = 0.5;
      initBoard([10, 0, 0, 2, 1, 0]);
    }
    if(level == 9)
    {
      monster1.active = true;
      monster1.movementTime = 0.5;
      monster2.active = true;
      monster2.movementTime = 1;
      monster3.active = true;
      monster3.movementTime = 0.5;
      initBoard([10, 1, 1, 1, 1, 0]);
    }
  }
  function initBoard(distribution)
  {
      for(var i = 0; i < game.rows; i++)
          {
              board[i] = [];
              for(var j = 0; j < game.cols; j++)
                  {
                      board[i][j] = getRandOnDistribution(distribution);
                  }
          }

      var randcoord1 = getRandomCoordinate();
      board[randcoord1.x][randcoord1.y] = -1;
      pcoord1 = randcoord1;

      var randcoord2 = getRandomCoordinate();
      while(cEquals(randcoord2, randcoord1))
        randcoord2 = getRandomCoordinate();
      board[randcoord2.x][randcoord2.y] = -2;
      pcoord2 = randcoord2;

      var randcoord3 = getRandomCoordinate();
      if(monster1.active == true)
      {
        while(cEquals(randcoord3, randcoord1) || cEquals(randcoord3, randcoord2) || isTrapped(randcoord3))
          randcoord3 = getRandomCoordinate();
        board[randcoord3.x][randcoord3.y] = -5;
        mcoord1 = randcoord3;
      }

      var randcoord4 = getRandomCoordinate();
      if(monster2.active == true)
      {
        while(cEquals(randcoord4, randcoord1) || cEquals(randcoord4, randcoord2) || cEquals(randcoord4, randcoord3) || isTrapped(randcoord4))
          randcoord4 = getRandomCoordinate();
        board[randcoord4.x][randcoord4.y] = -5;
        mcoord2 = randcoord4;
      }

      var randcoord5 = getRandomCoordinate();
      if(monster3.active == true)
      {
        while(cEquals(randcoord5, randcoord1) || cEquals(randcoord5, randcoord2) || cEquals(randcoord5, randcoord3) || cEquals(randcoord5, randcoord4) || isTrapped(randcoord5))
          randcoord5 = getRandomCoordinate();
        board[randcoord5.x][randcoord5.y] = -5;
        mcoord3 = randcoord5;
      }
  }
  function cEquals(a, b)
  {
    if(a.x == b.x && a.y == b.y)
      return true;
    return false;
  }
  function getRandomCoordinate()
  {
      var c = {};
      c.x = Math.floor(Math.random()*game.rows);
      c.y = Math.floor(Math.random()*game.cols);
      return c;
  }
  function getRandOnDistribution(dist)
  {
      var sum = 0;

       for(var i = 0; i < dist.length; i++)
          sum += dist[i];

      var rand = Math.random()*sum;

      var count = 0;
      var checker = dist[0];

      while(rand > checker)
          {
              count++;
              checker += dist[count];
          }

      return count;
  }
  function movementResolver(direction, pnum)
  {
      if(game.state == "menu" || game.pause == true || game.outcome != "none")
        return;
      if(game.pdeath1 == true && pnum == 1)
        return;
      if(game.pdeath2 == true && pnum == 2)
        return;
      console.log(direction, pnum);
      if(pnum == 1)
      {

          if(isValidMovement(pcoord1, direction))
              {
                  setNewBlockState(pcoord1, direction);
                  setBoard(pcoord1, 0);
                  pcoord1 = getNewCoordinate(pcoord1, direction);
                  setBoard(pcoord1, -1);
              }
      }
      if(pnum == 2)
      {
          if(isValidMovement(pcoord2, direction))
              {
                  setNewBlockState(pcoord2, direction);
                  setBoard(pcoord2, 0);
                  pcoord2 = getNewCoordinate(pcoord2, direction);
                  setBoard(pcoord2, -2);
              }
      }
  }
  function setNewBlockState(coord, direction)
  {
      var c = getNewCoordinate(coord, direction);

      if(getBoard(c) == -4)
          {
            heart.timeCounter = 0;
            heart.on = false;
            game.pdeath1 = false;
            game.pdeath2 = false;
            setBoard(pcoord1, -1);
            setBoard(pcoord2, -2);
            return;
          }

      if(getBoard(c) == 1)
          {
              setBoard(getNewCoordinate(c, direction), 1);
              return;
          }

      //count greens
      var greenCount = 0;
      var c3 = getNewCoordinate(coord, direction);
      while(getBoard(c3) == 3)
          {
              greenCount++;
              c3 = getNewCoordinate(c3, direction);
          }

      //move greens
      c3 = getNewCoordinate(coord, direction);
      for(var i = 0; i < greenCount; i++)
          {
              c3 = getNewCoordinate(c3, direction);
              setBoard(c3, 3);
          }
      if(greenCount > 0)
          return;

      //count purple
      var purpleCount = 0;
      var c4 = getNewCoordinate(coord, direction);
      while(getBoard(c4) != 0)
          {
              purpleCount++;
              c4 = getNewCoordinate(c4, direction);
          }

      //move purple
      setBoard(c4, 4);

  }
  function isValidMovement(coord, direction)
  {
      var c = getNewCoordinate(coord, direction);
      var c2 = getNewCoordinate(c, direction);

      if(getBoard(c) == -4)
        return true;
      if(getBoard(c) == 2 || getBoard(c) == 5 || getBoard(c) < 0)
          return false;
      if(getBoard(c) == 1 && !(getBoard(c2) == 0))
          return false;

      //check if a valid green line of blocks can be moved
      var greenCount = 0;
      var c3 = getNewCoordinate(coord, direction);
      while(getBoard(c3) == 3)
          {
              greenCount++;
              c3 = getNewCoordinate(c3, direction);
              if(greenCount > 5)
                  return false;
          }
      if(greenCount > 0 && getBoard(c3) != 0)
          return false;


      //checks if purple blocks can be teleported
      if(getBoard(c) == 4)
      {
          var purpleCount = 0;
          var c4 = getNewCoordinate(coord, direction);
          while(getBoard(c4) != 0)
              {
                  purpleCount++;
                  c4 = getNewCoordinate(c4, direction);
                  if(purpleCount > 2)
                      return false;
              }
      }
      return true;
  }
  function setBoard(coord, value)
  {
      board[coord.x][coord.y] = value;
  }
  function getBoard(coord)
  {
      return board[coord.x][coord.y];
  }
  function getNewCoordinate(coord, direction)
  {
      tempCoord = {x : coord.x, y : coord.y};
      if(direction == "up")
          {
              tempCoord.x-=1;
              tempCoord.x+=game.rows;
              tempCoord.x%=game.rows;
          }
      if(direction == "down")
          {
              tempCoord.x+=1;
              tempCoord.x+=game.rows;
              tempCoord.x%=game.rows;
          }
      if(direction == "right")
          {
              tempCoord.y+=1;
              tempCoord.y+=game.cols;
              tempCoord.y%=game.cols;
          }
      if(direction == "left")
          {
              tempCoord.y-=1;
              tempCoord.y+=game.cols;
              tempCoord.y%=game.cols;
          }
      return tempCoord;
  }
