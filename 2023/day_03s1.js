with((require('readline')).createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
}))
{
    var map = [];
    var sumparts = 0;

    on('line', (line) =>
    {
	map.push(line.split(''));
    });
    once('close', () =>
    {	
	for (var i = 0; i < map.length; ++i)
	    for (var j = 0; j < map[i].length; ++j)
            {
 		if (!isNaN(map[i][j]))
		    sumparts += checkloc(map, i, j);
//		process.stdout.write(map[i][j]);
	    }
	console.log(sumparts);
    });
};

function checkloc(map, i, j)
{
    var currpart = parseInt(map[i].join('').substring(j));
    // return 0 if last digit is already a number -> same number
    if (j > 0 && !isNaN(map[i][j - 1]))
	return 0;
    if ((i > 0 && j > 0 && isNaN(map[i - 1][j - 1]) && map[i - 1][j - 1] != '.')
	    || (j > 0 && isNaN(map[i][j - 1]) && map[i][j - 1] != '.')
	    || (i + 1 < map.length && j > 0 && isNaN(map[i + 1][j - 1]) && map[i + 1][j - 1] != '.'))
	return currpart;
    for (; j < map[i].length && !isNaN(map[i][j]); ++j)
    {
	if ((i > 0 && isNaN(map[i - 1][j]) && map[i - 1][j] != '.')
	    || (i + 1 < map.length && isNaN(map[i + 1][j]) && map[i + 1][j] != '.'))
	    return currpart;
    }
    if (j >= map[i].length)
	return 0;
    if ((i > 0 && isNaN(map[i - 1][j]) && map[i - 1][j] != '.')
	|| (isNaN(map[i][j]) && map[i][j] != '.')
	|| (i + 1 < map.length && isNaN(map[i + 1][j]) && map[i + 1][j] != '.'))
	return currpart;
    return 0;
}
