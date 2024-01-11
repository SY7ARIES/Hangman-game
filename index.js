//create word bank
const word_bank = [
    "australia",
    "america",
    "canada",
    "china",
    "england"
]

//set variables
const row = document.getElementsByClassName("row");
const btn = document.getElementsByClassName("btn");
const letter_line_container = document.getElementById("letter_line");
let hang_man = document.getElementById("hang_man");
let word = word_bank[Math.floor(Math.random()*(word_bank.length))];
let guess;
let text;
let q = document.getElementById("q");
let w = document.getElementById("w");
let e = document.getElementById("e");
let r = document.getElementById("r");
let t = document.getElementById("t");
let y = document.getElementById("y");
let u = document.getElementById("u");
let i = document.getElementById("i");
let o = document.getElementById("o");
let p = document.getElementById("p");
let a = document.getElementById("a");
let s = document.getElementById("s");
let d = document.getElementById("d");
let f = document.getElementById("f");
let g = document.getElementById("g");
let h = document.getElementById("h");
let j = document.getElementById("j");
let k = document.getElementById("k");
let l = document.getElementById("l");
let z = document.getElementById("z");
let x = document.getElementById("x");
let c = document.getElementById("c");
let v = document.getElementById("v");
let b = document.getElementById("b");
let n = document.getElementById("n");
let m = document.getElementById("m");
let all_letters = [q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m];
let letter_line = "";
let number_of_guesses = 0;
let guess_index;
let guessed_letters = Array([]);

//check
console.log(word);

//set up the letter line
letter_line = "_ ".repeat(word.length);
letter_line_container.textContent = letter_line;

//check user's guessest
for(let i=0; i<all_letters.length; i++){
    all_letters[i].onclick = function(){
        guess = String(all_letters[i].value).toLowerCase();

        if(word.includes(guess)){
            all_letters[i].style.textDecoration = "line-through";
            all_letters[i].style.color = "green";

            while(word.includes(guess)){
                let guess_index = word.indexOf(guess)
                letter_line = letter_line.replace(letter_line[(guess_index + 1)*2-2], guess.toUpperCase());
                word = word.replace(word[guess_index], " ");
                if (word.includes(guess) == false){
                    break;
                }
            }
            letter_line_container.textContent = letter_line;
            
        }else{
            all_letters[i].style.textDecoration = "line-through";
            all_letters[i].style.color = "red";
            number_of_guesses += 1;

            //check
            console.log(number_of_guesses);

            //GAME OVER
            if(number_of_guesses == 10){
                window.alert("Game Over!");
            }
            console.log(guess);
        }
    }
}
let image;
//image
switch(number_of_guesses){
    case 1:
        image = "<img src='images/stage-1.png'></img>";
        break;
    case 2:
        image = "<img src='images/stage-2.png'></img>";
        break;
    case 3:
        image = "<img src='images/stage-3.png'></img>";
        break;
    case 4:
        image = "<img src='images/stage-4.png'></img>";
        break;
    case 5:
        image = "<img src='images/stage-5.png'></img>";
        break;
    case 6:
        image = "<img src='images/stage-6.png'></img>";
        break;
    case 7:
        image = "<img src='images/stage-7.png'></img>";
        break;
    case 8:
        image = "<img src='images/stage-8.png'></img>";
        break;
    case 9:
        image = "<img src='images/stage-9.png'></img>";
        break;
    case 10:
        image = "<img src='images/stage-10.png'></img>";
        break;
    default:
        image = "";
        break;
}

hang_man.innerHTML = image;