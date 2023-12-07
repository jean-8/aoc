with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var map = [];

  on('line', (line) =>
    {
      map.push(line.split(':')[1].trim().replace(/ +/g, ' ').split(' '));
    });
  once('close', () =>
    {
      var result = new Array(map[0].length);

      for (var i = 0; i < map[0].length; ++i)
	for (var d = 1; d < map[0][i]; ++d)
	  if (d * (map[0][i] - d) > map[1][i])
	    result[i] = result[i] ? result[i] + 1 : 1;
      console.log(result.reduce((a, v) => a * v));
    });
};
