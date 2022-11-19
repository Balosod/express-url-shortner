import urlExist from "url-exist";

const validateUrl = async(req,res,next)=>{
    const {url} = req.body;
    const isExist = await urlExist(url)
    if (!isExist){
        return res.json({message:"Invalid URL",status:"400"})
    }
    next()

}
export default validateUrl