//Selector

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const quoteBtn = document.getElementById('new-quote')
const twitterBtn = document.getElementById('twitter')
const loader = document.getElementById('loader')

//Global

let apiQuotes = []

// Fetch quotes

GetQuotes = async()=>{
    loading()
    const apiURL = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json()
        complete()
    }catch (e) {
        throw new Error(`Error fetching quotes: ${e}`)
    }
}




//singleQuote

const getSingleQuote = ()=>{
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    quoteText.textContent = quote.text
    quote.author === null? quoteAuthor.textContent = 'Unknown': quoteAuthor.textContent = quote.author
    quote.text.length > 120? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    complete()
}

//Tweet quote

const tweetQuote = ()=> {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
    window.open(twitterUrl, '_blank');
}

//Loading functions

const loading = ()=>{
    loader.hidden = false
    quoteContainer.hidden = true
}

const complete = ()=>{
    loader.hidden = true
    quoteContainer.hidden = false
}


//Event listener

quoteBtn.addEventListener('click',getSingleQuote)
twitterBtn.addEventListener('click', tweetQuote)

//Onload - fetch quotes

GetQuotes()

