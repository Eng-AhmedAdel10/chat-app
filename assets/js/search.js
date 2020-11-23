// ****************************************setup********************************************
const searchInput=document.getElementById("searchInput");
const searchBtn=document.getElementById("searchBtn");
const ulSearch=document.getElementById("ul-search");
const searchContainer=document.querySelector(".search-container");
const closeBtn=document.querySelector(".search-container .close");

// ****************************************trigger function********************************************
searchBtn.onclick=()=>{
    search();
};

// ****************************************search********************************************
function search()
{
    if(searchInput.value == "")
    {
        alert("Please Enter Username")
    }
    else
    {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(JSON.parse(xhttp.responseText))
                let li = "";
                if(JSON.parse(xhttp.responseText).length == 0)
                {
                    li=`
                    <li class="not_found">Not Found   <i class="fa fa-frown-o" aria-hidden="true"></i>
                    </li>
                    `;
                }
                else
                {
                for (user of JSON.parse(xhttp.responseText)) {
                    li += `
                    <li>
                    <img src="/${user.image}" alt="img">
                    <a href="/profile/${user._id}">${user.username}</a>
                    </li>
                `
                }
                }
                searchContainer.style.transform = "translatex(0px)";
                ulSearch.innerHTML = li;
            }
        }
        xhttp.open("GET", `https://chat-43b.herokuapp.com/search?search=${searchInput.value}`, true);
        xhttp.send();
        searchInput.value = "";
    }
}




// *************************************closeBtn**********************************
closeBtn.onclick=()=>{
    searchContainer.style.transform="translatex(300px)";
}
