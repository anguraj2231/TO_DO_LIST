const ApiIntegration = async(url='', option=null,errmsg=null) => {
    try {
        const response = await fetch(url, option);
        if(!response.ok) throw Error("OOPS..!!,Item not Created")
    } catch (err) {
        errmsg = err.Message
    }finally{
        return errmsg
    }        
}

export default ApiIntegration