while read LINE;
do
    for I in $(seq 1 ${#LINE})
    do
	SUB=$(echo $LINE | cut -b $I-);
	ISDIGIT=$(echo $SUB | cut -b 1 | tr -d '[:alpha:]');
	if [ ${#ISDIGIT} -gt 0 ]; then
	    echo -n $ISDIGIT;
	else
	    echo -n $SUB | \
		sed -r 's#^one#1#;s#^two#2#;s#^three#3#;s#^four#4#;s#^five#5#;s#^six#6#;s#^seven#7#;s#^eight#8#;s#^nine#9#' | \
		cut -b 1 | tr -d '[:alpha:]' | tr -d '\n'
	fi;
    done
    echo
done |  \
    sed -r 's#^(.).*(.)$#\1\2#g' | sed -r 's#^(.)$#\1\1#g' | tr '\n' '+' | rev | cut -b 2- | rev | bc
