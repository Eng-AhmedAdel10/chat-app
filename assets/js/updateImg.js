// ****************************************setup********************************************
const submitBtn=document.querySelector(".updateImg-form input[type=submit]");
const chooseFile=document.querySelector(".updateImg-form input[type=file]");
const imgProfile=document.querySelector(".clip-profile img");

// *********************************show photo that selected***************************
chooseFile.onchange=()=>{
    submitBtn.style.display="inline-block";
    const file=chooseFile.files[0];
    console.log(chooseFile.files[0]);
    let reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
        imgProfile.src=reader.result
    } 
}
