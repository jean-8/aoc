with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
  var map = [];

  on('line', (line) =>
    {
      map.push([line.split(' ').map(x => Number(x))]);
      for (var i = 0; !map[map.length - 1][i].reduce((a, b) => a && b == 0, true); ++i)
      {
	map[map.length - 1].push([]);
	for (var j = 0; j < map[map.length - 1][i].length - 1; ++j)
	  map[map.length - 1][i + 1][j] = map[map.length - 1][i][j + 1] - map[map.length - 1][i][j];
      }
      map[map.length - 1][i].unshift(0);
      for (--i; i >= 0; --i)
	map[map.length - 1][i].unshift(map[map.length - 1][i][0] - map[map.length - 1][i + 1][0]);
    });
  once('close', () => {
    var s1 = 0, s2 = 0;

    map.forEach(e => s1 += e.reduce((a, b) => a += b[b.length - 1], 0));
    map.forEach(e => s2 += e[0][0]);
    console.log(s1, s2);
  });
};
