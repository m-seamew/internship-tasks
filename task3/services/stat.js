const returnStat = (database) => {
    const data = database();

    let stat = Array.from( new Set( data.map( el => el.cathegory ) ) ).map( el => ( { [ el ]:{ archived: 0, active: 0 } } ) );

    data.forEach( el => {
        stat.forEach( e => {
            const key = Object.keys(e)[0];
            if( key == el.cathegory ){
                el.archived ? e[key].archived++ : e[key].active++; 
            } 
        });
    });  
    return stat;
}

module.exports = returnStat;