"use strict";

console.log("Hello Everyone!");

const output = document.getElementById("output");
const informationArea = document.getElementById("informationArea");
const prompt = document.getElementById("prompt");


//Get Proxy-Key//POST Request//
async function getKey() {
    try {
        const options = {
            headers: { "Content-Type": "application/json" },
            method: "POST",
        };
        const res = await fetch("https://proxy-key-t0ox.onrender.com/get-key2", options);

        if(!res.ok){
            throw new Error("Bad")
        }

        const {key} = await res.json();
        //console.log(key)
        return key
    } catch (error) {
        console.error("Didn't get the key")
    }
}
//End of Proxy-Key Function// 

//Get Workers AI API//POST Request//
async function getTheAPI(url, options) {
    try {
        const res = await fetch(url, options);

        if(!res.ok){
            throw new Error("Didn't fetch the Data")
        }

        const {result} = await res.json();
        return result
    } catch (error) {
        
    }
}
//End of Workers API Function//

async function main() {
    try {
        informationArea.addEventListener("submit", async(event)=>{
        event.preventDefault()
        const key = await getKey()
        const corsURL = "https://corsproxy.io/?url="; 
        const workersEndpoint = "https://api.cloudflare.com/client/v4/accounts/82bd1d2acadf816a51be4a65b1c64317/ai/run/@cf/meta/llama-3-8b-instruct";
        const url = corsURL + workersEndpoint
        const promptBody = {
          messages: [
            { role: "system", content: "You are a used car sales rep, trying to make sales on four vehicles, one truck, one suv, and two sedans. A 2026 chevy silverado, color white, with 20,000 miles, no accidents, also 2021 nissan rogue, color black, with 70,000 miles no accidents. Two sedans a 2019 nissan altima, color white, 60,000 miles with no accidents, also a 2019 hyundai accent, color black, with 10,000 nothing wrong with it. You do not go off topic, you only tell the products or info about what a product is. Never respond with more than 15 words, and never list every single product, perhaps ask a question."},
            { role: "user", content: "What products do you sell? "},
          ],
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
            body: JSON.stringify(promptBody),
        };
        //const {response} = await getTheAPI(url, options);
        const response = "";
        console.log(response)
    })
    } catch (error) {
        console.log(error)
    }
}
main();