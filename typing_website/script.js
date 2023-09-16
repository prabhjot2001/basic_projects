let timer = document.getElementById("timer");
let textElement = document.getElementById("text");
let textAreaElement = document.getElementById('text-area');

textAreaElement.addEventListener('input', () =>{
    const arrayCharacter = textElement.querySelectorAll('span');
    const arrayInput = textAreaElement.value.split('');
    let correct = true;    

    arrayCharacter.forEach((characterSpan, index)=>{
        const character = arrayInput[index];
        if(character == null){
            characterSpan.classList.remove("incorrect");
            characterSpan.classList.remove('correct');
            correct = false;
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        }
        else{
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })
    if(correct){
        nextRandomText();
        textAreaElement.value = null;
    }
})

const url = 'https://api.quotable.io/random';
function getRandomText(){
    return fetch(url).then(response => response.json()).then(data => data.content);
}

async function nextRandomText(){
   const text = await getRandomText();
   console.log(text);
   textElement.innerHTML = "";
   text.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText= character;
    textElement.appendChild(characterSpan);
   });
//    TimeTimer()
}
nextRandomText();

