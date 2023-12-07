with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var map = [];

  on('line', (line) =>
    {
      map.push(line.split(':')[1].trim().replace(/ +/g, ''));
    });
  once('close', () =>
    {
      for (var d = 1, result = 0; d < map[0]; ++d)
	if (d * (map[0] - d) > map[1])
	  result++;
      console.log(result);
    });
};
