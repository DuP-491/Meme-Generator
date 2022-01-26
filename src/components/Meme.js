import React from "react";
import { useState,useEffect } from "react";

export default function Meme(){
    const api_url="https://api.imgflip.com/get_memes"
    const [allMemes,setAllMemes]=useState([])
    useEffect(function(){
        fetch(api_url)
        .then(data=>data.json())
        .then(data=>setAllMemes(data.data.memes))
    },[])
   
    const [meme,setMeme]=useState({
        topText:"",
        bottomText:"",
        url:"",
    })
    function getRandomMeme()
    {
        // console.log(allMemes)
        let index=Math.floor(Math.random()*allMemes.length);
        setMeme(prev=>({
            ...prev,
            url:allMemes[index].url,
        })
        )
    }
    function resetMeme()
    {
        setMeme(prevMeme=>({
            ...prevMeme,
            url:"",
            topText:"",
            bottomText:"",
        }))
    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    return (
        <div className="container">
            <div className="form">
            <input 
            className="form--text" 
            type="text" 
            placeholder="text1"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            />
            <input 
            className="form--text" 
            type="text" 
            placeholder="text2"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            
            />
            <button className="form--button" onClick={getRandomMeme}>Generate Meme</button>
            <button className="form--button" onClick={resetMeme}>Reset Meme</button>
            </div>
            <div className="meme">
            {meme.url && <img className="meme--image" src={meme.url} />}
            {meme.url && <h2 className="meme--text top">{meme.topText}</h2>} 
            {meme.url && <h2 className="meme--text bottom">{meme.bottomText}</h2>}
            </div>
           
        </div>
    )
}