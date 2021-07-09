const returnStat = ( data, cathegoriesLinks ) => {
    let stat = Array.from( new Set( data.map( el => el.cathegory ) ) ).map( el => ( { [ el ]:{ archived: 0, active: 0, img: cathegoriesLinks.default } } ) );

    data.forEach( el => {
        stat.find( e => {
            const key = Object.keys(e)[0];
            if(key === el.cathegory){
                el.archived ? e[key].archived++ : e[key].active++; 
            } 
        });
    });  

    stat.forEach( el => {
        Object.keys( cathegoriesLinks ).forEach( e => {
            const key = Object.keys(el)[0];
            if( key === e ){
                el[key].img = cathegoriesLinks[e];
            } 
        });
    })  
    return stat;
}

export default returnStat;