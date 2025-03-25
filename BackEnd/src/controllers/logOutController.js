const logOutController = {}

logOutController.logout = async (req, res) =>{
    res.clearCookie("authToken")
    return res.json({message : "Log out successfuly"})
}

export default logOutController;