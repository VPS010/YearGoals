const zod = require('zod');

const creategoal = zod.object({
    username: zod.string(),
    title: zod.string(),
    description: zod.string(),
    completed: zod.boolean()
})


const updategoal = zod.object({
    id: zod.string()
})

const createValidation = (req, res, next) => {

    const createpayload = req.body;
    const parsedpayload = creategoal.safeParse(createpayload);
    if (!parsedpayload.success) {
        res.status(400).json({
            msg: "You sent the wrong inputs"
        })
        return;
    } else {
        next();
    }

}


const updateValidation = (req, res, next) => {
    const updatepayload = req.body;
    const parsedpayload = updategoal.safeParse(updatepayload);
    if (!parsedpayload.success) {
        res.status(400).json({
            msg: "Sent wrong input"
        })
        return;
    } else {
        next()
    }
}

module.exports = {
    createValidation,
    updateValidation
}