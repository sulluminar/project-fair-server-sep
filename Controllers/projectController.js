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
    // getting value from query parameter
    // syntax: req.query.keyname
    const searchKey = req.query.search;
    console.log(searchKey)
    const query = {
        language: {
            // regular expression 
            // i = to remove case sensitivity
            $regex: searchKey, $options: 'i'
        }
    }
    try {
        const allProject = await projects.find(query);
        res.status(200).json(allProject)

    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.getUserProject = async (req, res) => {
    const userId = req.payload
    try {
        const userProject = await projects.find({ userId: userId });
        res.status(200).json(userProject)
    } catch (err) {
        res.status(401).json("Request failed due to ", err)
    }
}

exports.editUserProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    console.log("project id", id)
    console.log("user id", userId)
    const { title, language, github, website, overview, projectImage } = req.body;
    const uploadProjectImage = req.file ? req.file.filename : projectImage;
    try {
        const updateProject = await projects.findByIdAndUpdate(
            { _id: id },
            {
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImage: uploadProjectImage,
                userId: userId
            },
            { new: true }
        )
        await updateProject.save()
        res.status(200).json("Project updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
}
exports.deleteUserProject = async (req, res) => {
    const { id } = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json("Project deleted successfully")
    } catch (err) {
        res.status(401).json("delete failed", err)
    }
}