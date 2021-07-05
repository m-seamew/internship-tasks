export default class Model {
    constructor(){
        this.inputs = {
            taskName: document.querySelector('#task_name'),
            taskCathegory: document.querySelector('#task_cathegory'),
            taskContent: document.querySelector('#task_content'),
            taskSaveId: 'task_save',
            taskUpdateId: 'task_update'
        }
        this.isArchived = false;

        this.cathegories = {
                'Task': '/cathegories/task.svg',
                'Random Thought': '/cathegories/thinking.svg',
                'Idea': '/cathegories/lamp.svg',
                'default': '/cathegories/task.svg',
        }

        this.data = [
            {
                id: 1,
                taskName: "Shoping list",
                created: "Sun Jul 04 2021 20:38:54 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Task",
                content: "Tomatoes, bread",
                archived: false
            },
            {
                id: 2,
                taskName: "The theory of evolution",
                created: "Sun Jul 04 2021 20:39:45 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Random Thought",
                content: "The evolution...",
                archived: false
            },
            {
                id: 3,
                taskName: "New feature",
                created: "Sun Jul 04 2021 20:41:17 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Idea",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet porttitor metus, et aliquet arcu faucibus vitae. Maecenas vitae nisi ut leo vulputate convallis. Vivamus metus purus, semper sed neque eu, fringilla pulvinar turpis. ",
                archived: true,
            },
            {
                id: 4,
                taskName: "Visit the doctor",
                created: "Sun Jul 04 2021 20:42:56 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Task",
                content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
                archived: false,
            },
            {
                id: 5,
                taskName: "StartUp idea presentation",
                created: "Sun Jul 04 2021 20:44:51 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Idea",
                content: "deadline for application - 4.08.2021",
                archived: false
            },
            {
                id: 6,
                taskName: "Go to the cinema",
                created: "Sun Jul 04 2021 20:46:19 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Task",
                content: "Starting at 15:00",
                archived: true
            },
            {
                id: 7,
                taskName: "Answer to emails",
                created: "Sun Jul 04 2021 20:47:18 GMT+0200 (Восточная Европа, стандартное время)",
                createdTitle: "Jul 4, 2021",
                cathegory: "Task",
                content: "",
                archived: false
            }
        ]

        this.monthes = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
    }
       
    data;
    monthes;
    cathegories; 
    inputs;
  
    isArchived;
    setIsArchived = (val) => this.isArchived = val;


    addTask( listOfTask, input, callback ) {

        if( input.taskName.value.replace(' ', '') === '') {
            input.taskName.placeholder = 'Please, print the name of task';
            input.taskName.value = '';
            return false;     
        } else {
            const newDate = new Date();
            const newCreatedTitle = `${ this.monthes[ newDate.getMonth() ] } ${ newDate.getDate() }, ${ newDate.getFullYear() }`
            const listLength = listOfTask.length;
            let newId = 0;
            listLength !== 0 ? newId = listOfTask[ listLength-1 ].id + 1 : newId = 1;

            listOfTask.push(
                {
                    id: newId,
                    taskName: `${ input.taskName.value }`,
                    created: `${ newDate }`,
                    createdTitle: `${ newCreatedTitle }`,
                    cathegory: `${ input.taskCathegory.value }`,
                    content: `${ input.taskContent.value }`,
                    archived: false,
                }
            )    
            callback();
        }
        return true;
    }

    deleteTask( data, event ){
        const tempId = parseInt( event.target.dataset.id );
        const currentEl = data.find( el => el.id === tempId );
        data.splice( data.indexOf( currentEl ), 1 );
    }

    updateTask( listOfTask, input, callback, event ){
        input.taskName.placeholder = 'Name of task';

        const tempId = parseInt( event.target.dataset.id );
        const currentEl = listOfTask.find( el => el.id === tempId );

        if( input.taskName.value.replace(' ', '') === '') {
            input.taskName.placeholder = 'Please, print the name of task';
            input.taskName.value = '';
            return false;
        } else {
            currentEl.taskName = `${ input.taskName.value }`;
            currentEl.cathegory =`${ input.taskCathegory.value }`;
            currentEl.content = `${ input.taskContent.value }`;            
            callback();
        }
        return true;
    }

    calcStat( data, cathegoriesLinks ){
        let stat = Array.from( new Set( data.map( el => el.cathegory ) ) ).map( el => ( { [ el ]:{ archived: 0, active: 0, img: cathegoriesLinks.default } } ) );

        data.forEach( el => {
            stat.find( e => {
                const key = Object.keys(e)[0];
                if(key == el.cathegory){
                    el.archived ? e[key].archived++ : e[key].active++; 
                } 
            });
        });  

        stat.forEach( el => {
            Object.keys( cathegoriesLinks ).forEach( e => {
                const key = Object.keys(el)[0];
                if( key == e ){
                    el[key].img = cathegoriesLinks[e];
                } 
            });
        })  
        return stat;
    }

    changeArchivedStatusOfTask(data, event){
        const tempId = parseInt( event.target.dataset.id );
        const currentEl = data.find( el => el.id === tempId );
        currentEl.archived = !currentEl.archived;
    }

    changeArchivedStatus( setIsArchived, event ) {
        setIsArchived( event.target.value === 'true' );
    };
}