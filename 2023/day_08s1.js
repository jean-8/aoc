with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
  var counter = 0;
  var lr;
  var nodes = [];

  on('line', (line) =>
    {
      if (!counter++)
	lr = line;
      else if (line.length)
      {
	nodes[line.substring(0, 3)] =
	  {
	    name: line.substring(0, 3),
	    L: line.substring(7, 10),
	    R: line.substring(12, 15)
	  };
      }
    });
  once('close', () => {
    for (var counter = 0, target = 'AAA'; target != 'ZZZ'; ++counter)
      target = nodes[target][lr.charAt(counter % lr.length)];
    console.log(counter);
  });
};
