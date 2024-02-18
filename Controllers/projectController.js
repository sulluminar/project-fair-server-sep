const projects = require('../Models/projectSchema')
// add project
exports.addProject = async (req, res) => {
    console.log("Inside addProjectController")
    const userId = req.payload;
    console.log(userId)
    const projectImage = req.file.filename;
    console.log(projectImage)
    const { title, language, github, website, overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(406).json("Project already exist, Upload a new one")
        }
        else {
            const newProject = new projects({
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save();
            res.status(200).json("Project added successfully")
        }
    } catch (err) {
        res.status(401).json("Unbale to add project due to:", err)
    }

}

exports.getHomeProject = async (req, res) => {
    try {
        const homeProject = await projects.find().limit(3);
        res.status(200).json(homeProject)
    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getAllProject = async (req, res) => {
    try {
        const allProject = await projects.find();
        res.status(200).json(allProject)

    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getUserProject = async (req,res)=>{
    const userId= req.payload
    try{
        const userProject= await projects.find({userId:userId});
        res.status(200).json(userProject)
    }catch(err){
        res.status(401).json("Request failed due to ", err)
    }
}