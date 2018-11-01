//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const catApiKey = '2dc76a41-d118-4c29-9b52-95f402be4611';
const apiUrl = 'https://api.thecatapi.com/v1';
const corsUrl = 'https://bypasscors.herokuapp.com/api/?url=';
const noBlockMeApiUrl = 'http://proxy9747.my-addr.org/myaddrproxy.php/';
const ASYNC_ENABLED = true;
const IMAGES_SEARCH = '/images/search';

function anonymizeUrl(url)
{
    var protocol = url.substring(0, url.indexOf(':'));
    var urlNoProtocol = url.replace(/^https?\:\/\//i, "");
    var resultUrl = noBlockMeApiUrl + protocol + "/" + urlNoProtocol;

    return (resultUrl);
}

function getRandomCatPicFor(img, picSize = "medium", needGifs = true, needStaticImages = true)
{
    var paramSize = picSize == "medium" ? "med" : picSize;
    var paramMimeTypes = "";
    if (needGifs)
    {
        paramMimeTypes += "gif,";
    }
    if (needStaticImages)
    {
        paramMimeTypes += "jpg,png,";
    }
    if (!paramMimeTypes)
    {
        return null;
    }
    paramMimeTypes = paramMimeTypes.slice(0, -1);

    const http = new XMLHttpRequest();
    http.open("GET", apiUrl + IMAGES_SEARCH + "?size=" + paramSize + "&mime_types=" + paramMimeTypes, ASYNC_ENABLED);
    console.log("[" + apiUrl + IMAGES_SEARCH + "?size=" + paramSize + "&mime_types=" + paramMimeTypes + "]");
    http.setRequestHeader("x-api-key", catApiKey);
    http.onreadystatechange = function ()
    {
        if (http.readyState != 4)
        {
            return;
        }
        else if (http.status != 200)
        {
            console.log("error: " + http.statusText);
            return;
        }

        var jsonResponse = JSON.parse(http.responseText);
        var picUrl = jsonResponse[0].url;
        console.log("original url=[" + picUrl + "]");
        if(picUrl.search("tumblr"))
        {
            img.src = anonymizeUrl(picUrl);
        }
        else
        {
            img.src = picUrl;
        }
    }

    http.send();
}

function print(value)
{
    console.log(value);
}
