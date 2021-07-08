const validateBody = ( schema ) =>  {
    return async ( req, res, next ) => {
        try{ 
            const availableFields = Object.keys( schema.fields );
            const fields = Object.keys( req.body );
            const err = [];
    
            fields.forEach( el => {
                const finded = availableFields.find( e => e === el );
                !finded ? err.push( el ) : null;
            }); 

            if( err.length > 0 ){
                return res.status( 400 ).json( `unexended fields - ${err.join(', ' )}`)
            } else {
                await schema.validate( req.body );
                next();
            }
        } catch( error ){ 
            return res.status(400).json( error.message );
        }
    }
}

module.exports = validateBody;   