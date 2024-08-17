import { NextResponse } from "next/server"; 

 const middleware=(req:any)=>{
    let verify = req.cookie.get('token')
    console.log(verify)
    let url = req.url

    if(!verify && url.includes('/dashboard')){
        console.log('hreererere')
        NextResponse.redirect('http://localhost:3000/')
    }
}

export default middleware