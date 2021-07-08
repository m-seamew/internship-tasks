const type = {
    'int': (str) => {
        const check = str.replace(/\d/g, "");
        return check.length === 0;
    },
    'float': (str) => (str * 1) !== NaN,
    'string': (str) => {
        const check = str.replace(/[)(*.,/\]\[\{\}^%$#@!&0-9]/g, "");
        return check.length > 0;
    },
    'bool': (str) => str == 'true' || str == 'false'
} 

const validateParamsLength = (
        validateReq,
        res,
        numParams = 0,
        numQuery = 0,
        arrParamsType = [],
        arrQueryType = [],
        func = () => {},
        next = () => {},
    ) => {
        const paramsLength = Object.keys( validateReq.params ).length;
        const queryLength = Object.keys( validateReq.query ).length;
        
        if( paramsLength !== numParams ) { 
            res.status(400).json({ message: `expected for ${numParams} params, recived ${paramsLength}` });
        } else if( queryLength !== numQuery ) {
            res.status(400).json({ message: `expected for ${numQuery} query, recived ${queryLength}` });
        } else {
            func(
                validateReq,
                res,
                numParams,
                numQuery,
                arrParamsType,
                arrQueryType,
                next,
            );
        }
};

const validateParamsType = (
        validateReq,
        res,
        numParams = 0,
        numQuery = 0,
        arrParamsType = [],
        arrQueryType = [],
        func = () => {}
    ) => {
    
        if( arrParamsType.length === numParams && arrQueryType.length === numQuery ){
            let err = false;
            const arrValParam = [ ...Object.values(validateReq.params) ];
            arrValParam.forEach( ( val, index ) => {
                Object.keys(type).forEach( e => {
                    if( arrParamsType[index] == e ){
                        const result = type[e](val);    
                        if( !result ){
                            err = true;
                            res.status(400).json({ message: `dont recive expected param type - ${arrParamsType[index]}` });
                        }               
                    }
                });
            });

            const arrValQuery = [ ...Object.values(validateReq.query) ];
            arrValQuery.forEach( ( val, index ) => {
                Object.keys(type).forEach( e => {
                    if( arrQueryType[index] == e ){
                        const result = type[e](val);    
                        if( !result ){
                            err = true;
                            res.status(400).json( {message: `dont recive expected query type - ${arrQueryType[index]}`} );
                        }               
                    }
                });
            });

            !err ? func() : null;      
        }else{
            return res.status(500).json({message: `error in send params for Validity Params`});
        }
};

const validateParam = (numParams = 0, numQuery = 0, arrParamsType = [], arrQueryType = []) => {
        return async (req, res, next) => {
            try{
                return validateParamsLength(
                    req,
                    res,
                    numParams,
                    numQuery,
                    arrParamsType,
                    arrQueryType,
                    validateParamsType,
                    next,
                );   
            } catch (error){
                return res.status(500).json({message: error.message});
            }
            
        }    
};

module.exports = validateParam;
