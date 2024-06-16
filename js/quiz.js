document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const resultElement = document.querySelector('.result');
  
    let correctAnswer = '';
  
    function getRandomCountries(data, count) {
      const shuffled = data.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    function loadQuestion() {
        
    fetch('../api/api.json')
    .then(res => res.json())
    .then(data => 
        {const countries = getRandomCountries(data, 4);
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