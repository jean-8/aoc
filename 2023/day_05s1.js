with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var map = [];

  on('line', (line) =>
    {
      if (line.length == 0)
	return;
      if (line.split(' ')[0] == "seeds:")
	map.push(line.split(':')[1].trim().split(' '));
      else if (line.match(/[a-zA-Z]/g))
	map.push(new Array());
      else
	map[map.length - 1].push(line.split(' '));
    });
  once('close', () =>
    {
      var locations = [];

      for (var seed = 0; seed < map[0].length; ++seed, locations.push(id))
	for (var a = 1, id = parseInt(map[0][seed]); a < map.length; ++a)
	  for (var b = 0; b < map[a].length; ++b)
	  {
	    map[a][b].forEach(function (e, i, x){ x[i] = parseInt(e); });
	    if (id >= map[a][b][1] && id < map[a][b][1] + map[a][b][2])
	    {
	      id += map[a][b][0] - map[a][b][1];
	      break ;
	    }
	  }
      console.log(Math.min(...locations));
    });
};
