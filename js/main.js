//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', pokeHandler)
let dataFromFirstFetch;

//let pokeID

async function pokeHandler(){ //you have to make sure JS recognizes the following will be ayncrounous code
  async function getFetch(url){//we want to create moudlar code and stay away frim hard coding
    const res = await fetch(url)
    const data= await res.json()
    return data // if we return datawe are returning the object that has all the data
  
    }//here we abstracted our calls to link the data directly and all it takes is one call
    async function getPokeInfo(pokemon) {
      const pokeData = await getFetch('https://pokeapi.co/api/v2/pokemon/' +pokemon)
    
    return pokeData;
    }

async function postPokeSprites(pokemonData){
  const pokeDestination = document.getElementById("pokeContainer");
  pokeDestination.innerHTML = ''

 
// we can send all the evolution data together and loop over it 
//to post the individual pokemon in the same function call
//these happen to EACH pokemon
// we can send all the evolution data together and loop over it 
//to post the individual pokemon in the same function call
//these happen to EACH pokemon

for (let i = 0; i < pokemonData.length ; i++){
  const pokeHTML = ` 
  <p>${pokemonData[i].name}</p>
  <img src = ${pokemonData[i].sprites.front_default}/>
  `;
  pokeDestination.insertAdjacentHTML("before end", pokeHTML)

  }
}
  
  try{
  // when the function is called it will step outside its syncrronous structure
  const choice = document.querySelector('input').value

  //const pokeRes = await fetch(url) // we created a variable that holds the first fetch
  //const data= await pokeRes.json() // this is the same thing as res.json
    const pokeData = await getPokeInfo(choice)
  
  console.log(pokeData)


  document.querySelector('span').innerHTML = pokeData.types[0].type.name
  document.querySelector('#moves').innerHTML = pokeData.moves[0].move.name
  document.querySelector('#moves2').innerHTML = pokeData.moves[1].move.name
  document.querySelector('#moves3').innerHTML = pokeData.moves[2].move.name
  document.querySelector('#img1').src = pokeData.sprites.front_default
  document.querySelector('#img').src = pokeData.sprites.back_default
        

  pokeID = pokeData.species.url
  const speciesData = await getFetch(pokeID)

  console.log(speciesData)


  const evoChainUrl = speciesData.evolution_chain.url
  const evoChainData = await getFetch(evoChainUrl)

  console.log(evoChainData)

  const basePokemon = evoChainData.chain.species.name
  const secondPokemon = evoChainData.chain.evolves_to[0].species.name
  const thirdPokemon = evoChainData.chain.evolves_to[0].evolves_to[0].species.name
  //below is a loop that is looping over a literal array
  const pokemonInfos = await Promise.all([basePokemon, secondPokemon, thirdPokemon].map((pokemon) => getPokeInfo(pokemon)));

  console.log(pokemonInfos)

  // postPokeSprites(await getPokeInfo(basePokemmon))
  // postPokeSprites(await getPokeInfo(secondPokemmon))
  // postPokeSprites(await getPokeInfo(thirdPoke))


/*  document.querySelector('#p1').innerText = pokeData.name
  document.querySelector('#img3').src = pokeData.sprites.front_default

  document.querySelector('#p2').innerText = pokeData.name
  document.querySelector('#img4').src = pokeData.sprites.front_default

  document.querySelector('#p3').innerText = evoToSprite1Data.name
  document.querySelector('#img5').src = evoToSprite1Data.sprites.front_default


*/

  // const evoThreeUrl = 
  // const evoThreeRes = await fetch(evoThreeUrl)
  // const evoThreeData = await evoThreeRes.json()
  // console.log(evoThreeData)


  // evoThreeData.
  // const 
          // // console.log(data.chain.evolves_to[0].species)
          // console.log(data.chain.species)
          
         
          // document.querySelector('#img3').src = data.sprites
          // document.querySelector('#img4').src = data.sprites
          // document.querySelector('#img5').src = data.sprites
          // document.querySelector('#img6').src = data.sprites
        
        // fetch(url3)
        // .then(res => res.json()) // parse response as JSON
        // .then(data => {
            // console.log(data)
      // })
  
  }
  catch(err){
    console.log(`err ${err}` )
  }

}
/*for()
  const evoToSprite1Res = await fetch(evoToUrl1)
  const evoToSprite1Data = await evoToSprite1Res.json()
// this will generate these evolutions 
//I will have to plug them into a loop
//it will require a for of and an if statement
first evo = data.chain.species.name
second evo = data.chain.evolves_to[0].species.name
third evo = data.chain.evolves_to[0].evolves_to.species*/

