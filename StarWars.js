const button = document.querySelector("#playGame");
let person;
let people;
const gameBox = document.querySelector("#gamebox");
let rightAnswers = 0;
let wrongAnswers = 0;

const getAllPeople = async () => {
  const resp = await axios.get("https://swapi.co/api/people/");
  people = resp.data.results;
};

getAllPeople();

const newPerson = async () => {
  person = people[Math.floor(Math.random() * people.length)];
  gameBox.innerHTML = `
  <h2>Who is this describing?</h3>
  <input type="text" />
  <button id="guess-button">enter</button>

  <p>Their height in meters is: ${person.height}
  <p>Their weight in kilos is: ${person.mass}
  <p>Their hair color is: ${person.hair_color}
  <p>Their skin color is: ${person.skin_color}
  <p>Their eye color is: ${person.eye_color}
  <p>Their birth year is: ${person.birth_year}
  <p>Their gender is: ${person.gender}
  `;

  const guessButton = gameBox.querySelector("#guess-button");
  const answerInput = gameBox.querySelector("input");

  guessButton.addEventListener("click", () => {
    if (answerInput.value === person.name) {
      rightAnswers += 1;
    } else {
      wrongAnswers += 1;
    }

    if (rightAnswers + wrongAnswers === 10) {
      if (rightAnswers >= 6) {
        gameBox.innerHTML = `
        <h3 id="right">You Win! Your score is ${rightAnswers}/10.</h3>
        `
      } else {
        gameBox.innerHTML = `
         <h3 id="wrong">You Lose! You got ${rightAnswers}/10.</h3>
        `
      }
      return true;
    }

    newPerson();
  });
};

button.addEventListener("click", newPerson);
