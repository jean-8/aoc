ID=0;
SUMID=0;

while read LINE;
do

    ID=$(( $ID + 1 ));
    echo $ID;
    GAME_SUCCESS=1;
    GAMES=$( echo $LINE | cut -f2 -d:);

    while read GAME;
    do
	while read GCOL;
	do

	    GNB=$(echo $GCOL | grep -Eo '[0-9]+');
	    GNM=$(echo $GCOL | grep -Eo '[a-z]+');

	    if [ x$GNM = xred -a $GNB -gt 12 ]; then
		GAME_SUCCESS=0;
	    elif [ x$GNM = xgreen -a $GNB -gt 13 ]; then
		GAME_SUCCESS=0;
	    elif [ x$GNM = xblue -a $GNB -gt 14 ]; then
		GAME_SUCCESS=0;
	    fi;

	    #echo $ID:x$GNM:$GNB:$GAME_SUCCESS
	    
	done < <(echo $GAME | tr ',' '\n');	
    done < <(echo $GAMES | tr ';' '\n');

    if [ $GAME_SUCCESS -eq 1 ]; then
	SUMID=$(( $SUMID + $ID ));
    fi;
    
done;

echo $SUMID;
