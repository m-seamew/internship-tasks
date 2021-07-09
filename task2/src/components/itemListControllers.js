import React from 'react';

function itemListControllers({imgPath, imgTitle, func}){
    return(
        <td>
            <div class="todo__icon todo__icon--update">
                <img class="icon--vertical-middle todo__icon--header" src={ imgPath } alt={ imgTitle } onClick={func}/>
            </div>
        </td>
    )
}