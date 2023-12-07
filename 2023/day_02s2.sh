ID=0;
POWERGAMES=0;

while read LINE;
do

    ID=$(( $ID + 1 ));
    echo $ID;
    GAME_MAX_R=0;
    GAME_MAX_G=0;
    GAME_MAX_B=0;
    GAMES=$( echo $LINE | cut -f2 -d:);

    while read GAME;
    do
	while read GCOL;
	do

	    GNB=$(echo $GCOL | grep -Eo '[0-9]+');
	    GNM=$(echo $GCOL | grep -Eo '[a-z]+');

	    if [ x$GNM = xred -a $GNB -gt $GAME_MAX_R ]; then
		GAME_MAX_R=$GNB;
	    elif [ x$GNM = xgreen -a $GNB -gt $GAME_MAX_G ]; then
		GAME_MAX_G=$GNB;
	    elif [ x$GNM = xblue -a $GNB -gt $GAME_MAX_B ]; then
		GAME_MAX_B=$GNB;
	    fi;

	done < <(echo $GAME | tr ',' '\n');	
    done < <(echo $GAMES | tr ';' '\n');

    POWERGAMES=$(( $POWERGAMES + ( $GAME_MAX_R * $GAME_MAX_G * $GAME_MAX_B) ));
    
done;

echo $POWERGAMES;
