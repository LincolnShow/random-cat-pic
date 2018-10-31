//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const catApiKey = '2dc76a41-d118-4c29-9b52-95f402be4611'; 
const apiUrl = 'https://api.thecatapi.com/v1';
const ASYNC_ENABLED = true;
const IMAGES_SEARCH = '/images/search'; 


function getRandomCatPicFor(img)
{
    img.style = "opacity:0.4;filter:alpha(opacity=40)";
    var result; 
    const http = new XMLHttpRequest(); 
    http.open("GET", apiUrl + IMAGES_SEARCH + "?", ASYNC_ENABLED); 
    http.setRequestHeader("x-api-key", catApiKey); 
    http.onreadystatechange = function()
    {
        if (http.readyState != 4)
        {
            return; 
        }
        else if (http.status != 200)
        {
            console.log("error: " + http.statusText); 
        }

        var jsonResponse = JSON.parse(http.responseText); 
        var picUrl = jsonResponse[0].url; 

        result = picUrl; 

        img.src = (picUrl + "?random" + new Date().getTime());

        img.style = "opacity:1.0;filter:alpha(opacity=100)"
    }

    http.send();
}

function print(value)
{
    console.log(value); 
}
