import Groq from "groq-sdk"


const client = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

var generateQuotes = false
var prompt = ""

var quote = []

async function main() {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: `GIVE ME 5 QUOTES that WILL HELP ME WITH THIS ${prompt}. ONLY Respond WITH THE EXACT QUOTES NO NUMBERS OR ANOTHING JUST THE QUOTES separte it by a linbreak` }],
        model: 'llama3-8b-8192',
    });

    quote = chatCompletion.choices[0].message.content.split("\n\n");
    document.getElementById("mainQuote").innerHTML = quote[index]

    console.log(quote)
}

var index = 0

async function changeQuote() {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: `GIVE ME 1 QUOTE that WILL HELP ME WITH THIS ${prompt}. ONLY Respond WITH THE EXACT QUOTE NO NUMBERS OR ANOTHING JUST THE QUOTE separte it by a linbreak` }],
        model: 'llama3-8b-8192',
    });
    var data = chatCompletion.choices[0].message.content.split("\n\n");


    quote.shift()
    quote.push(data)
    index = 0        
    
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode == 32 && generateQuotes) {
        index = 0
        document.getElementById("mainQuote").innerHTML = quote[index]
        changeQuote()
    }
})

document.getElementById("generate").addEventListener("click", () => {
    generateQuotes = true
    main()

    prompt = document.getElementById("actualPrompt").innerText

    document.getElementById("prompt").remove()

})