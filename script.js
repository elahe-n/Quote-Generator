const newEl=document.querySelector("#new")
const textEl=document.querySelector("#text")
const authorEl=document.querySelector("#author")
const twitterEl=document.querySelector("#twitter")
const containerEl=document.querySelector("#container")
const loaderEl=document.querySelector("#loader")

let apiQuotes=[];

function loading(){
    loaderEl.hidden=false
    containerEl.hidden=true
}

function complete(){
    loaderEl.hidden=true
    containerEl.hidden=false
}

function newQuote(){
    loading();
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];  
    if (!quote.author) {
        authorEl.textContent='Unknown'
    }else{
        authorEl.textContent=quote.author
    }

    if (quote.text.length>100){
        textEl.classList.add('long-quote')
    }else{
        textEl.classList.remove('long-quote')
    }
    
    textEl.textContent=quote.text
    complete();
}

function tweetQuote(){
    const twitterUrRL=`https://twitter.com/intent/tweet?text=${textEl.textContent} _ ${authorEl.textContent} `;
    window.open(twitterUrRL, '_blank')
}

// Get quotes from api
async function getQuotes(){
    loading();
    const apiURL="https://type.fit/api/quotes";
    try{
        const response= await fetch(apiURL);
        apiQuotes=await response.json();
        newQuote();
    }
    catch(error){
        getQuotes();
    }
}

getQuotes();
newEl.addEventListener('click',newQuote)
twitterEl.addEventListener('click',tweetQuote)