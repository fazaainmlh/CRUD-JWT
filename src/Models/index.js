const db = require("../Config/Database.js");
const User = require("./userModel.js");

const syncUser=async()=>{
    try {
        await db.sync({alter:true, force:true});
        console.log("database and model synced succesfully");
    }catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    syncUser
};