with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
  var counter = 0;
  var lr;
  var nodes = [];
  var startnodes = [];

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
	if (line.substring(2, 3) == 'A')
	  startnodes.push(line.substring(0, 3));
      }
    });
  once('close', () => {
    for (var results = [], i = 0; i < startnodes.length; ++i, results.push(counter))
      for (var counter = 0; startnodes[i].charAt(2) != 'Z'; ++counter)
	startnodes[i] = nodes[startnodes[i]][lr.charAt(counter % lr.length)];
    console.log(lcm(...results));
  });
};

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => (a * b) / gcd(a, b));
};
