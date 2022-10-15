function unlock(val){
    const pasSvg = document.getElementById("pasSvg")
    const pass = document.getElementById("pass");
    const erpassSvg = document.getElementById("erpassSvg");
    const Repass = document.getElementById("Repass");
    if( val == "A"){
            pasSvg.src = "/bg/unlock.svg";
            pass.type = "text";
            setTimeout(()=>{
            pasSvg.src = "/bg/lock.svg";
            pass.type = "password";
            },3000)
    }else{
        erpassSvg.src = "/bg/unlock.svg";
        Repass.type = "text";
        setTimeout(()=>{
            erpassSvg.src = "/bg/lock.svg";
            Repass.type = "password";
            },3000)
        
    }
    
}