const yup = require('yup'); 

module.exports = {
        Create: yup.object().shape({
                taskName : yup.string().required(),
                created : yup.date().required(),
                cathegory : yup.string().required(),
                content : yup.string().required(),
        }),
        Update: yup.object().shape({
                taskName : yup.string().required(),
                created : yup.date().required(),
                cathegory : yup.string().required(),
                content : yup.string().required(),
                archived: yup.boolean().required(),
        })
}