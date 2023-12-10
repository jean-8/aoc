const v8 = require('v8');
v8.setFlagsFromString('--stack-size=100000');

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
  var map = [];
  var S;

  on('line', (line) =>
    {
      map.push(line);
      if (line.match(/S/g))
	S = [map.length - 1, line.indexOf('S')];
    });
  once('close', () => {
    console.dir((rec_run(map, S, 0, [], null)).it / 2);
  });
};

function rec_run(map, loc, it, path, nogo)
{
  if (it && map[loc[0]].charAt(loc[1]) == 'S')
    return {it: it, path: path};
  if (loc[1] - 1 >= 0 && nogo != 'L'
      && nodes[map[loc[0]].charAt(loc[1])].L.indexOf(map[loc[0]].charAt(loc[1] - 1)) >= 0)
    return rec_run(map, [loc[0], loc[1] - 1], it + 1, [...path, loc], 'R');
  if (loc[1] + 1 < map[loc[0]].length && nogo != 'R'
      && nodes[map[loc[0]].charAt(loc[1])].R.indexOf(map[loc[0]].charAt(loc[1] + 1)) >= 0)
    return rec_run(map, [loc[0], loc[1] + 1], it + 1, [...path, loc], 'L');
  if (loc[0] - 1 >= 0 && nogo != 'U'
      && nodes[map[loc[0]].charAt(loc[1])].U.indexOf(map[loc[0] - 1].charAt(loc[1])) >= 0)
    return rec_run(map, [loc[0] - 1, loc[1]], it + 1, [...path, loc], 'D');
  if (loc[0] + 1 < map.length && nogo != 'D'
      && nodes[map[loc[0]].charAt(loc[1])].D.indexOf(map[loc[0] + 1].charAt(loc[1])) >= 0)
    return rec_run(map, [loc[0] + 1, loc[1]], it + 1, [...path, loc], 'U');
}
