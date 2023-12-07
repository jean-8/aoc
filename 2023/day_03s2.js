with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var map = [];
  var sumparts = 0;

  on('line', (line) =>
    {
      map.push(line.split(''));
    });
  once('close', () =>
    {
      for (var i = 0; i < map.length; ++i)
	for (var j = 0; j < map[i].length; ++j)
 	  if (map[i][j] == '*')
	    sumparts += checkgear(map, i, j);
      console.log(sumparts);
    });
};

function checkgear(map, i, j)
{
  var nbparts = 0;
  var ratio = 1;

  [i - 1, i + 1].forEach(function (e)
  {
    if (e >= 0 && e < map.length)
    {
      if (!isNaN(map[e][j]) || (j - 1 >= 0 && !isNaN(map[e][j - 1])))
      {
	nbparts++;
	for (var c = j - 1; c >= 0 && !isNaN(map[e][c]); --c)
	  ;
	ratio *= parseInt(map[e].join('').substring(c + 1));
      }
      if (isNaN(map[e][j]) && j + 1 < map[e].length && !isNaN(map[e][j + 1]))
      {
	nbparts++;
	for (var c = j + 1; c < map[e].length && !isNaN(map[e][c]); ++c)
	  ;
	ratio *= parseInt(map[e].join('').substring(j + 1));
      }
    }
  });
  [j - 1, j + 1].forEach(function (e)
  {
    if (e >= 0 && e < map[i].length && !isNaN(map[i][e]))
    {
      for (nbparts++; e >= 0 && !isNaN(map[i][e]); --e)
	;
      ratio *= parseInt(map[i].join('').substring(e + 1));
    }
  });
  return nbparts == 2 ? ratio : 0;
}
