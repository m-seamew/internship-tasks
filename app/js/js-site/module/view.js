export default class View {

    constructor(){
        this.list = document.querySelector( '#list_app' );
        this.statList = document.querySelector( '#list_stat-app' );
    }
    
    list;
    statList;

    render( data, archivedParam, statFunc, cathegoriesLinks ){
        this.list.innerHTML = data.filter( e => e.archived === archivedParam).map( el => {
            return `
            <tr class="todo__task">
                <th scope="row">
                    <div class="todo__icon">
                        <img class="icon--vertical-middle todo__icon--header" src="${ '/img' + this.returnCathegoryImg(el.cathegory, cathegoriesLinks) }" alt="cathegory">
                    </div>
                </th>
                <td>${ el.taskName }</td> 
                <td>${ el.createdTitle }</td>
                <td>${ el.cathegory }</td>
                <td class="todo__content-conteiner">
                    <div class="truncate-text todo__content todo__content--small">
                        ${ el.content }
                    </div>
                </td>
                <td>${ this.returnDates(el.content) }</td>
                <td>
                    <div class="todo__icon todo__icon--update">
                        <img class="icon--vertical-middle todo__icon--header" src="./img/pencil.svg" alt="change task" data-id=${ el.id }>
                    </div>
                </td>
                <td>
                    <div class="todo__icon todo__icon--delete">
                        <img class="icon--vertical-middle todo__icon--header" src="./img/delete.svg" alt="delete task"  data-id=${el.id}>
                    </div>
                </td>
                <td>
                    ${ !archivedParam 
                        ?  `<div class="todo__icon todo__icon--archived">
                                <img class="icon--vertical-middle todo__icon--header" src="./img/download-button.svg" alt="archive task" data-id=${el.id}>
                            </div>`
                        :  `<div class="todo__icon todo__icon--archived">
                                <img class="icon--vertical-middle todo__icon--header" src="./img/reply.svg" alt="return to active task" data-id=${el.id}>
                            </div>`
                    }
                </td>
            </tr>`
        }).join('')
        
        const stat = statFunc();
        this.statList.innerHTML = stat.map( el => {
            const key = Object.keys(el)[0]; 
            return `
            <tr>
                <th scope="row">
                    <div class="todo__icon">
                        <img class="icon--vertical-middle todo__icon--header" src="./img${el[key].img}" alt="${key + 'cathegory'}"  >
                    </div>
                </th>
                <td>${ key }</td>
                <td>${ el[key].active }</td>
                <td>${ el[key].archived }</td>
            </tr>`
        }).join('');   
    }

    returnDates( cont ){
        const regExp = [ 
            /((0|1)[0-9]([.\-/])[0-3][0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([0-3][0-9]([.\-/])(0|1)[0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([0-9]([.\-/])[0-3][0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([0-3][0-9]([.\-/])[0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([0-9]([.\-/])[0-9]([.\-/])(19|20)[0-9]{2})/g,
        ]

        const wrongExp = [
            /([0-9][0-9]([.\-/])[3-9][2-9]([.\-/])(19|20)[0-9]{2})/g,
            /([3-9][2-9]([.\-/])[0-9][0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([1-9][3-9]([.\-/])[1-9][3-9]([.\-/])(19|20)[0-9]{2})/g,
            /([2-9][0-9]([.\-/])[2-9][0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([0][0]([.\-/])[0-9][0-9]([.\-/])(19|20)[0-9]{2})/g,
            /([0-9][0-9]([.\-/])[0][0]([.\-/])(19|20)[0-9]{2})/g,
        ]

        wrongExp.forEach( el => {
            if(cont.match(el) !== null){
                cont.match(el).forEach( el => cont = cont.replace(el, ''));           
            }
        })
        

        let arr = [];
        regExp.forEach( el => { 
            if(cont.match(el) !== null){
                cont.match(el).forEach( el => {
                    cont = cont.replace(el, '');
                    arr.push(el);
                });           
            }
        });

        const arrMatches = Array.from( new Set(arr) );
        return arrMatches.length > 0
            ? arrMatches.map( el => `<div>${el}</div>`).join('')
            : '-'
    }

    returnCathegoryImg( cathegory, cathegoriesLinks ){
        let img = cathegoriesLinks.default;
        Object.keys(cathegoriesLinks).forEach( e => e == cathegory ? img = cathegoriesLinks[e] : null);
        return img
    }

    addEventListener( closeTaskPopup, archivedStatusChange, openCreateTaskPopup ){

        const taskClose = document.querySelector( '#task_close' );
        taskClose.addEventListener( 'click', closeTaskPopup );

        const archivedStatus = document.querySelector( '#archived_status' );
        const activeStatus = document.querySelector( '#active_status' );

        const archivedFn = (e) => {
            archivedStatusChange(e);
            archivedStatus.parentElement.classList.add( 'active' );
            activeStatus.parentElement.classList.remove( 'active' );
        }
        archivedStatus.addEventListener( 'change', archivedFn );


        const activeFn = (e) => {
            archivedStatusChange(e);
            activeStatus.parentElement.classList.add( 'active' );
            archivedStatus.parentElement.classList.remove( 'active' );
        }
        activeStatus.addEventListener( 'change', activeFn );

        const openCreateTaskBtn = document.querySelector( '#new_task' );
        openCreateTaskBtn.addEventListener( 'click', openCreateTaskPopup );
    }

    addEventListenerForNewTaskSave( addTask, inputs ){
        const taskBtnSave = document.querySelector(`#${ inputs.taskSaveId }`);

        const eventFunction = () => {
            addTask();
            taskBtnSave.removeEventListener( 'click', eventFunction );
        };
        taskBtnSave ? taskBtnSave.addEventListener( 'click', eventFunction ) : null;
    }

    addEventListenerForUpdateTask( updateTask, inputs ){
        const taskBtnUpd = document.querySelector(`#${ inputs.taskUpdateId }`);
        
        const eventFunction = () => {
            updateTask();
            taskBtnUpd.removeEventListener( 'click', eventFunction );
        };
        taskBtnUpd ? taskBtnUpd.addEventListener( 'click', eventFunction ) : null;
    }
    
    addDynamicEventListener( deleteTask, changeArchivedStatusOfTask, openTaskPopupUpd ){
        const deleteBtn = document.querySelectorAll( '.todo__icon--delete' );
        deleteBtn.forEach( e => e.children[0].addEventListener( 'click', deleteTask ));

        const archiveBtn = document.querySelectorAll( '.todo__icon--archived' );
        archiveBtn.forEach( e => e.children[0].addEventListener( 'click', changeArchivedStatusOfTask ));

        const updateBtn = document.querySelectorAll( '.todo__icon--update' );
        updateBtn.forEach( e => e.children[0].addEventListener( 'click', openTaskPopupUpd ));

        const tasks = document.querySelectorAll( '.todo__task' );
        tasks.forEach( el => el.addEventListener( "click" , () => { 
            [...el.children].forEach( ch => { 
                if(ch.classList.contains( 'todo__content-conteiner' )){
                    ch.children[0].classList.contains( 'truncate-text' ) 
                        ? ch.children[0].classList.remove( 'truncate-text' ) 
                        : ch.children[0].classList.add( 'truncate-text' ) 
                }
            })
        })); 
    }

    closeTaskPopup( inputs ){
        document.querySelector( 'html' ).style.overflow = 'auto';
        document.querySelector( '.main' ).classList.remove( 'popup-active' );
        document.querySelector( '.main__popup' ).classList.remove( 'main__popup--active' );

        inputs.taskName.value = '';
        inputs.taskCathegory.value = inputs.taskCathegory.options[0].value;
        inputs.taskContent.value = '';
        inputs.taskName.placeholder = 'Name of task';
    }

    openTaskPopup( inputs ){
        document.querySelector( 'html' ).style.overflow = 'hidden';
        document.querySelector( '.main' ).classList.add( 'popup-active' );
        document.querySelector( '.main__popup' ).classList.add( 'main__popup--active' );

        const btn = document.querySelector( '.todo__icon--confirm-changes' ).children[0];
        btn.id = inputs.taskSaveId;
    }

    openTaskPopupUpd( inputs, data, event ){
        document.querySelector( 'html' ).style.overflow = 'hidden';
        document.querySelector( '.main' ).classList.add( 'popup-active' );
        document.querySelector( '.main__popup' ).classList.add( 'main__popup--active' );

        const currentEl = data.find( el => el.id == event.target.dataset.id );
        inputs.taskName.value = currentEl.taskName;

        let currentCathegoryIndex = 0;
        [...inputs.taskCathegory.options].forEach( (el,index) => {
            el.value === currentEl.cathegory ? currentCathegoryIndex = index : null;
        });

        inputs.taskCathegory.value = inputs.taskCathegory.options[currentCathegoryIndex].value;
        inputs.taskContent.value = currentEl.content;

        const btn = document.querySelector( '.todo__icon--confirm-changes' ).children[0];
        btn.id = inputs.taskUpdateId;
    }
}