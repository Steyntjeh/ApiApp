document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const resultElement = document.querySelector('.result');
  
    let correctAnswer = '';
  
    // een random land uit de json file halen
    function getRandomCountries(data, count) {
      const shuffled = data.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    // Haalt gegevens op en stelt een nieuwe vraag op met vier random landen.

    function loadQuestion() {
        
    fetch('../api/api.json')
    .then(res => res.json())
    .then(data => 
        {

          // 4 antwoorden ophalen waarvan 1 goed is
          const countries = getRandomCountries(data, 4);
          const correctCountry = countries[Math.floor(Math.random() * countries.length)];
          correctAnswer = correctCountry.capital ? correctCountry.capital[0] : 'Unknown';
          questionElement.textContent = `What is the capital of ${correctCountry.name.common}?`;

          optionsElement.innerHTML = '';
          countries.forEach(country => {
            const capital = country.capital ? country.capital[0] : 'Unknown';
            const option = document.createElement('div');
            option.textContent = capital;
            option.classList.add('option');
            option.addEventListener('click', () => checkAnswer(capital));
            optionsElement.appendChild(option);
        });
      });
  }

  // de functie om te controleren of het goede antwoord is aangeklikt
  function checkAnswer(selected) {
    if (selected === correctAnswer) {
      resultElement.textContent = 'Correct!';
    } else {
      resultElement.textContent = `Wrong! The correct answer is ${correctAnswer}.`;
    }
    setTimeout(() => {
      resultElement.textContent = '';
      loadQuestion();
    }, 2000);
  }

  loadQuestion();
});