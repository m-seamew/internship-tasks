class Note {

    constructor(id, taskName, created, cathegory, content) {
        this.id = id, 
        this.taskName = taskName,
        this.created = created,
        this.cathegory = cathegory,
        this.content = content,
        this.archived = false
    }

}

module.exports = { Note };
