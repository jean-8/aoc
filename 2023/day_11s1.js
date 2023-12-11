with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
  var map = [];

  on('line', (line) =>
    {
      map.push(line);
      if (line.indexOf('#') == -1)
	map.push(line);


    });
  once('close', () => {
    var g = [], p1 = 0;

    for (var j = 0; j < map[0].length; ++j)
      if (map.reduce((a,v) => a + v.charAt(j), '').indexOf('#') == -1)
      {
	map.forEach((l, i) => map[i] = l.substring(0, j) + '.' + l.substring(j));
	j++;
      }
    for (var i = 0; i < map.length; ++i)
      for (var j = 0; j < map[i].length; ++j)
	if (map[i].charAt(j) == '#')
	  g.push([i, j]);
    for (var i = 0; i < g.length - 1; ++i)
      for (var j = i + 1; j < g.length; ++j)
	p1 += Math.max(g[i][0], g[j][0]) - Math.min(g[i][0], g[j][0])
            + Math.max(g[i][1], g[j][1]) - Math.min(g[i][1], g[j][1]);
    console.log(p1);
  });
};
