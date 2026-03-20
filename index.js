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
        console.log(key)
        return key
    } catch (error) {
        console.error("Didn't get the key")
    }
}
//End of Workers Proxy-Key Function// 

async function main() {
    try {
        const key = await getKey() 
    } catch (error) {
        console.log(error)
    }
}
main();