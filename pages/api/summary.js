import { checkToken } from "../../backendLibs/checkToken";
import { readUsersDB } from "../../backendLibs/dbLib";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req)
    if(!user || !user.isAdmin){
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    
    //compute DB summary
    const users = readUsersDB()
    let userCount = 0
    let adminCount = 0
    let totalMoney = 0
    users.map((x) => {
      userCount++
      if(x.isAdmin){
        adminCount++
      }
      
      totalMoney += x.money

    })

    //return response
    return res.json({
      ok:true,
      userCount,
      adminCount,
      totalMoney
    })

  } 
  else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
