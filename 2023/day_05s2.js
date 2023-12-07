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
	map.push(line.split(':')[1].trim().split(' ').map((e) => Number(e)));
      else if (line.match(/[a-zA-Z]/g))
	map.push(new Array());
      else
	map[map.length - 1].push(line.split(' ').map((e) => Number(e)));
    });
  once('close', () =>
    {
      map.forEach((e) => e.sort((a, b) => a[1] - b[1]));
      for (var seedi = 0, range_src = []; seedi <= map[0].length - 2; seedi += 2)
	range_src.push([map[0][seedi], map[0][seedi] + map[0][seedi + 1] - 1]);
      console.log(Math.min(...rec_range_trans(map, 1, range_src).map((v) => v[0])));
    });
};

function rec_range_trans(map, a, ranges_src)
{
  var dst = [];

  ranges_src.forEach(function (e)
  {
    for (var b = 0, vmin = e[0], vmax = e[1]; b < map[a].length; ++b)
    {
      if (vmax < map[a][b][1] || vmin > map[a][b][1] + map[a][b][2] - 1)
	continue;
      if (vmin < map[a][b][1])
      {
	dst.push([vmin, map[a][b][1] - 1]);
	vmin = map[a][b][1];
      }
      else if (vmin >= map[a][b][1] && vmax <= map[a][b][1] + map[a][b][2] - 1)
      {
	dst.push([vmin + map[a][b][0] - map[a][b][1], vmax + map[a][b][0] - map[a][b][1]]);
	vmax = -1;
	break ;
      }
      else if (vmin >= map[a][b][1] && vmax > map[a][b][1] + map[a][b][2] - 1)
      {
	dst.push([vmin + map[a][b][0] - map[a][b][1], map[a][b][2] - 1 + map[a][b][0]]);
	vmin = map[a][b][1] + map[a][b][2];
      }
      b--;
    }
    if (vmin <= vmax)
      dst.push([vmin, vmax]);
  });
  return (a < map.length - 1 && dst.length) ? rec_range_trans(map, a + 1, dst) : dst;
}
