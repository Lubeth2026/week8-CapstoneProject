"use strict";

console.log("Hello Everyone!");

const output = document.getElementById("output");
const informationArea = document.getElementById("informationArea");
const prompt = document.getElementById("prompt");


//Get Proxy-Key//POST Request//
//
async function getKey() {
    try {
        const options = {
            headers: { "Content-Type": "application/json" },
            method: "POST",
        };
        const res = await fetch("https://proxy-key-t0ox.onrender.com/get-key", options);

        if(!res.ok){
            throw new Error("Bad")
        }

        const {key} = await res.json();
//Key matches so it can be destructured by {}//
        //console.log(key)
        return key
    } catch (error) {
        console.error("Didn't get the key")
    }
}
//End of Proxy-Key Function// 

//Get Workers AI API//POST Request//
//
async function getTheAPI(url, options) {
    try {
        const res = await fetch(url, options);

        if(!res.ok){
            throw new Error("Didn't fetch the Data")
        }

        const {result} = await res.json();
//Key matches so it can be destructured by {}//
        return result
    } catch (error) {
        
    }
}
//End of Workers API Function//

//Render Workers AI Response to the DOM//
//
function render(response){
    output.textContent = ""
    const p = document.createElement("p");
    p.textContent = response
    output.appendChild(p)
}
//End of Render Workers AI API//

async function main() {
//AI can see all of the messages being typed NOW//
//Messages outside the eventListener will NOT be over written every time you click the button//
    const messages = [
            { role: "system", content: "You are a used car sales rep, trying to make sales on four vehicles, one truck, one suv, and two sedans. A 2026 Chevy Silverado, color white, with 600 miles, also 2021 Nissan Rogue, color black, with 40,000 miles. Two sedans a 2019 Nissan Altima, color white, 25,000 miles, also a 2019 Hyundai Accent, color black, with 10,000 nothing wrong with it, the 2026 is pretty new, the other vehicles no accidents listed. You do not go off topic, you only tell the products or info about what a product is. Never respond with more than 15 words, and never list every single product, perhaps ask a question."},
          ];
    try {
        informationArea.addEventListener("submit", async(event)=>{
        event.preventDefault()

        const key = await getKey()
        const corsURL = "https://corsproxy.io/?url="; 
        const workersEndpoint = "https://api.cloudflare.com/client/v4/accounts/82bd1d2acadf816a51be4a65b1c64317/ai/run/@cf/meta/llama-3-8b-instruct";
        const url = corsURL + workersEndpoint
//Whatever user types in gets updated to the string//Then pushes to the array, then takes array and put it back into the body//Which then gets passed through options body: JSON//
        messages.push({ role: "user", content: prompt.value });
        console.log(messages)
        const promptBody = {
          messages:messages
//Key matches value so it can be destructured//
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
            body: JSON.stringify(promptBody),
        };
        const {response} = await getTheAPI(url, options);
//AI Agents Response//
        messages.push({ role: "assistant", content: response })
        render(response)
    })
    } catch (error) {
        console.log(error)
    }
}
main();