const v8 = require('v8');
v8.setFlagsFromString('--stack-size=3000');

with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
  var nodes =
      {
	'|': { L: '',     U: 'F7|S', R: '',     D: '|LJS' },
	'-': { L: 'LF-S', U: '',     R: '7J-S', D: ''     },
	'L': { L: ''    , U: 'F7|S', R: '7J-S', D: ''     },
	'J': { L: 'LF-S', U: 'F7|S', R: '',     D: ''     },
	'7': { L: 'LF-S', U: '',     R: '',     D: '|LJS' },
	'F': { L: ''    , U: '',     R: '7J-S', D: '|LJS' },
	'.': { L: ''    , U: '',     R: '',     D: ''     },
	'S': { L: 'LF-',  U: 'F7|',  R: '7J-',  D: '|LJ'  }
      };
  var nogos =
      {
	'|': { D: [[ [0,1]        ], [ [0,-1]        ]], U: [[ [0,-1]        ], [ [0,1]        ]] },
	'-': { R: [[ [-1,0]       ], [ [1,0]         ]], L: [[ [1,0]         ], [ [-1,0]       ]] },
	'L': { D: [[              ], [ [0,-1],[1,0]  ]], L: [[ [0,-1],[1,0]  ], [              ]] },
	'J': { R: [[              ], [ [0,1],[1,0]   ]], D: [[ [0,1],[1,0]   ], [              ]] },
	'7': { R: [[ [-1,0],[0,1] ], [               ]], U: [[               ], [ [-1,0],[0,1] ]] },
	'F': { L: [[              ], [ [-1,0],[0,-1] ]], U: [[ [-1,0],[0,-1] ], [              ]] }
      };
  var map = [], S;

  on('line', (line) =>
    {
      map.push(line);
      if (line.match(/S/g))
	S = [map.length - 1, line.indexOf('S')];
    });
  once('close', () => {
    var res = rec_run(map, S, 0, [], ''), ifinal = [0, 0];

    map.forEach((e, t) => map[t] = e.split(''));
    res.path.slice(1).forEach(function (e, t)
    {
      nogos[map[e[0]][e[1]]][res.nogo.charAt(t + 1)].forEach(function (f, u)
      {
	map[ e[0] ][ e[1] ] = 'O';
	f.forEach(function (g)
        {
	  if (e[0] + g[0] < 0 || e[0] + g[0] >= map.length
	      || e[1] + g[1] < 0 || e[1] + g[1] >= map[e[0] + g[0]].length)
	    return ;
	  for (var i = 0; i < res.path.length; ++i)
	    if (res.path[i][0] == e[0] + g[0] && res.path[i][1] == e[1] + g[1])
	      return ;
	  map[ e[0] + g[0] ][ e[1] + g[1] ] = '' + Number(u + 1);
	});
      });
    });
    for (var i = 0; i < map.length; ++i)
      for (var j = 0; j < map[i].length; ++j)
	if (map[i][j] == '1' || map[i][j] == '2')
	  rec_finish(map, i, j, map[i][j]);
    map.forEach(a => ifinal[0] += a.reduce((b, c) => b + (c == '1' ? 1 : 0), 0));
    map.forEach(a => ifinal[1] += a.reduce((b, c) => b + (c == '2' ? 1 : 0), 0));
    console.log(Math.min(...ifinal));
  });
};

function rec_finish(map, a, b)
{
  [ [a-1,b], [a+1,b], [a,b-1], [a,b+1] ].forEach(function (e){
    if (e[0] >= 0 && e[0] < map.length
	&& e[1] >= 0 && e[1] < map[e[0]].length
	&& map[e[0]][e[1]] != '1' && map[e[0]][e[1]] != '2' && map[e[0]][e[1]] != 'O')
    {
      map[e[0]][e[1]] = map[a][b];
      rec_finish(map, e[0], e[1]);
    }
  });
}

function rec_run(map, loc, it, path, nogo)
{
  if (it && map[loc[0]].charAt(loc[1]) == 'S')
    return {it: it, path: path, nogo: nogo};
  if (loc[1] - 1 >= 0 && nogo.charAt(nogo.length - 1) != 'L'
      && nodes[map[loc[0]].charAt(loc[1])].L.indexOf(map[loc[0]].charAt(loc[1] - 1)) >= 0)
    return rec_run(map, [loc[0], loc[1] - 1], it + 1, [...path, loc], nogo + 'R');
  if (loc[1] + 1 < map[loc[0]].length && nogo.charAt(nogo.length - 1) != 'R'
      && nodes[map[loc[0]].charAt(loc[1])].R.indexOf(map[loc[0]].charAt(loc[1] + 1)) >= 0)
    return rec_run(map, [loc[0], loc[1] + 1], it + 1, [...path, loc], nogo + 'L');
  if (loc[0] - 1 >= 0 && nogo.charAt(nogo.length - 1) != 'U'
      && nodes[map[loc[0]].charAt(loc[1])].U.indexOf(map[loc[0] - 1].charAt(loc[1])) >= 0)
    return rec_run(map, [loc[0] - 1, loc[1]], it + 1, [...path, loc], nogo + 'D');
  if (loc[0] + 1 < map.length && nogo.charAt(nogo.length - 1) != 'D'
      && nodes[map[loc[0]].charAt(loc[1])].D.indexOf(map[loc[0] + 1].charAt(loc[1])) >= 0)
    return rec_run(map, [loc[0] + 1, loc[1]], it + 1, [...path, loc], nogo + 'U');
}
