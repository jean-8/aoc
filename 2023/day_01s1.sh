cat | tr -d '[:alpha:]' | sed -r 's#^(.).*(.)$#\1\2#g' | sed -r 's#^(.)$#\1\1#g' | tr '\n' '+' | rev | cut -b 2- | rev | bc
