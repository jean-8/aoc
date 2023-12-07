with((require('readline')).createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}))
{
  var cards = [];

  on('line', (line) =>
    {
      var card = line.substring(line.indexOf(':') + 1).replace(/ +/g, ' ').split('|');

      cards.push([1, card[0].trim().split(' '), card[1].trim().split(' ')]);
    });
  once('close', () =>
    {
      var i = 0;

      cards.forEach(function (card)
      {
	var cardpoints = 0;

	card[1].forEach(function (e)
	{
	  if (card[2].includes(e))
	    cardpoints++;
	});
	for (var c = i + 1; c < i + 1 + cardpoints; ++c)
	  cards[c][0] += card[0];
	i++;
      });

      console.log(cards.reduce((a, v) => a + v[0], 0));
    });
};
