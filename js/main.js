//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)


//let pokeID


async function getFetch(){
  try{
  // when the function is called it will step outside its syncrronous structure
  const choice = document.querySelector('input').value
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  

  const pokeRes = await fetch(url) // we created a variable that holds the first fetch
  const pokeData = await pokeRes.json()// this is the same thing as res.json
  console.log(pokeData)
  pokeID = pokeData.species.url


  document.querySelector('span').innerHTML = pokeData.types[0].type.name
  document.querySelector('#moves').innerHTML = pokeData.moves[0].move.name
  document.querySelector('#moves2').innerHTML = pokeData.moves[1].move.name
  document.querySelector('#moves3').innerHTML = pokeData.moves[2].move.name
  document.querySelector('#img1').src = pokeData.sprites.front_default
  document.querySelector('#img').src = pokeData.sprites.back_default
        

 
      

  const speciesRes = await fetch(pokeID)
  const speciesData = await speciesRes.json()
  console.log(speciesData)


  const evoChainUrl = speciesData.evolution_chain.url
  const evoChainRes = await fetch(evoChainUrl)
  const evoChainData = await evoChainRes.json()
  console.log(evoChainData)

  const evolvesFrom = evoChainData.chain.species.name
  const evolvesTo = evoChainData.chain.evolves_to[0].evolves_to[0].species.name
  
  console.log(evolvesFrom)
  console.log(evolvesTo)

  const evoFromUrl1 = 'https://pokeapi.co/api/v2/pokemon/'+evolvesFrom
  const evoToUrl1 = 'https://pokeapi.co/api/v2/pokemon/'+evolvesTo

  async function pokeSprite1(pokemon){
  const evoFromSprite1Res = await fetch(evoFromUrl1)
  const evoFromSprite1Data = await evoFromSprite1Res.json()
  const evoToSprite1Res = await fetch(evoToUrl1)
  const evoToSprite1Data = await evoToSprite1Res.json()
  console.log(evoFromSprite1Data)
  console.log(evoToSprite1Data)
  
  document.querySelector('#p1').innerText = evoFromSprite1Data.name
  document.querySelector('#img3').src = evoFromSprite1Data.sprites.front_default

  document.querySelector('#p2').innerText = pokeData.name
  document.querySelector('#img4').src = pokeData.sprites.front_default

  document.querySelector('#p3').innerText = evoToSprite1Data.name
  document.querySelector('#img5').src = evoToSprite1Data.sprites.front_default




  }pokeSprite1(evolvesTo)
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
// this will generate these evolutions 
//I will have to plug them into a loop
//it will require a for of and an if statement
first evo = data.chain.species.name
second evo = data.chain.evolves_to[0].species.name
third evo = data.chain.evolves_to[0].evolves_to.species*/