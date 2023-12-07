with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var map = [];

  on('line', (line) =>
    {
      map.push(line.split(' '));
    });
  once('close', () =>
    {
      map.map((e) => e[1] = Number(e[1]));
      map.forEach((e, i) => map[i][2] = card_point(e[0].split('')));
      map.sort((a, b) => b[2] - a[2]);
      console.log(map.map((e, i) => e = [e[0], e[1], i + 1]).reduce((a, v) => a + v[1] * v[2], 0));
    });
};

function card_point(card)
{
  const c = 'AKQJT98765432';

  for (var j = 0, res = [], cc = [...card];
       j < 5 && cc.length;
       ++j, cc = cc.filter((e) => e != modev))
  {
    var modev = mode([...cc]);
    res.push([modev, cc.filter(e => e == modev).length]);
  }
  var bonus = [...res].sort((a, b) => a[1] - b[1]).pop()[1];
  bonus = (bonus == 3 && res.length == 2 || bonus == 2 && res.length == 3) ? 500000 : 0;
  return res.length * 1000000 + card.reduce((a, v) => a * 13 + c.indexOf(v), 0) + bonus;
}

function mode(arr)
{
  return arr.sort((a,b) => arr.filter(v => v===a).length - arr.filter(v => v===b).length).pop();
}
