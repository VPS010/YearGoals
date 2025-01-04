const express = require('express');
const { createValidation } = require('./middleware');
const { goals } = require('./db');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("Hello Yup server is UP!!!");
})

app.get("/goals", async (req, res) => {
    try {
        const goallist = await goals.find({});
        console.log("goals fetched", goallist)
        res.json(goallist)
    } catch (e) {
        console.log(e);
    }

})

app.post("/goals/add", createValidation, async (req, res) => {
    const goal = req.body;

    try {
       const newtask= await goals.create({
            username: goal.username,
            title: goal.title.toUpperCase(),
            description: goal.description,
            dedline: goal.dedline,
            completed: false
        });

        res.json(newtask);
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "An error occurred while adding the goal." });
    }
})



app.put("/goals/edit", createValidation, async (req, res) => {
    const goal = req.body;
    if (!goal.id) {
        return res.status(400).json({ msg: "Goal ID is required" });
    }
    try {
        await goals.updateOne({
            _id: goal.id
        }, {
            username: goal.username,
            title: goal.title,
            description: goal.description,
            dedline: goal.dedline,
            completed: false
        })

        res.json({
            msg: "goal edited"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Error editing the goal" });
    }
})


app.put("/goals/:id", async (req,res)=>{
    const id= req.params.id;
    if (!id) {
        return res.status(400).json({ msg: "Goal ID is required" });
    }
    try{
        
        const goal= await goals.findOne({_id:id})


        await goals.updateOne({
            _id:id
        },{
            completed: !goal.completed
        })
        res.json({
            msg:"goal completed"
        })
    }catch(e){
        console.log(e);
    }


})

app.delete("/goals/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ msg: "Goal ID is required" });
    }
    try {
        const result = await goals.deleteOne({
            _id: id
        });
        if (result) {
            res.json({ msg: "Goal deleted successfully", deletedGoal: result });
        } else {
            res.status(404).json({ msg: "Goal not found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Error while deleting the goal" });
    }
})



app.listen(3000, () => {
    console.log("server is running at port 3000");
})