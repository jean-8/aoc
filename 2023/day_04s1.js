with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var points = 0;

  on('line', (line) =>
    {
      var cardpoints = 0;
      var card = line.substring(line.indexOf(':') + 1).replace(/ +/g, ' ').split('|');
      card[0].trim().split(' ').forEach(function (e){
	if (card[1].trim().split(' ').includes(e))
	  cardpoints = !cardpoints ? 1 : cardpoints * 2;
      });
      points += cardpoints;
    });
  once('close', () =>
    {
      console.log(points);
    });
};
