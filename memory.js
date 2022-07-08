// images 
let imagesParent = Array.from(document.querySelectorAll(".img"));
let showCounter = 0;
let similarArray = [];
let AllSimilarArray = [];
let wrongTries = document.querySelector('.tries');
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let user = document.querySelector(".user");
let startGame = document.querySelector('.startGame');
let idPlayer = 1;
let countless = document.querySelector(".countless");
let setTimeForGame;
let numberOfImages = [];
let endGame = document.querySelector('.EndGame');
let congrat = document.querySelector('.congrat');
let statistics = document.querySelector('.statistics');
let yourName;
let congratilationsSound = document.querySelector('.congratilationsSound');
let errorMusic = document.querySelector('.errorSound');
let successMusic = document.querySelector('.success');
let mainMusic = document.querySelector('.mainMusic');

startGame.firstElementChild.onclick = () => {
        yourName = window.prompt("Enter Your Name :");
        if (yourName.trim() == "") {
            yourName = `Player${idPlayer}`
            idPlayer++;
        }
        user.firstElementChild.textContent = yourName;
        startGame.remove();
        document.getElementsByTagName('section')[0].classList.remove('opac');

        // show images for a while
        // random images 
        numberOfImages = Array.from(Array(imagesParent.length).keys());
        // shuffle ordering 
        function shuffle(array) {
            let newArr = [];
            let randomNumber;
            while (newArr.length < array.length) {
                randomNumber = Math.floor(Math.random() * array.length);
                if (!newArr.includes(randomNumber)) {
                    newArr.push(randomNumber);
                }
            }
            return newArr
        }


        for (let i = 0; i < imagesParent.length; i++) {
            numberOfImages = shuffle(numberOfImages);
            imagesParent[i].style.order = `${numberOfImages[i]}`
            imagesParent[i].firstElementChild.classList.add('show');
            imagesParent[i].lastElementChild.firstElementChild.classList.add('hide');
        }

        // set countless 
        let countlessInterval = setInterval(() => {
            countless.textContent = +countless.textContent - 1
            if (+countless.textContent == 0) {
                clearInterval(countlessInterval);
                countless.remove();
            }
        }, 1000);

        // show before hiding
        setTimeout(() => {
            for (let image of imagesParent) {
                image.firstElementChild.classList.remove('show')
                image.lastElementChild.firstElementChild.classList.remove('hide')
            }
            mainMusic.play();
        }, 5000);

        // set time 
        setTimeout(() => {
            setTimeForGame = setInterval(() => {
                seconds.textContent = +seconds.textContent + 1;
                if (+seconds.textContent < 10) {
                    seconds.textContent = `0${+seconds.textContent}`;
                } else if (+seconds.textContent == 59) {
                    minutes.textContent = +minutes.textContent + 1;
                    seconds.textContent = '00';
                    if (+minutes.textContent < 10) {
                        minutes.textContent = `0${+minutes.textContent}`
                    }
                }
            }, 1000);
        }, 5000);

        for (let image of imagesParent) {
            image.onclick = () => {
                // checking images
                if (showCounter < 2) {
                    image.firstElementChild.classList.add('show')
                    image.lastElementChild.firstElementChild.classList.add('hide')
                    showCounter++;
                    image.classList.add('no-clicking');
                    similarArray.push(image.firstElementChild.classList[0]);
                    if (showCounter > 1) {
                        for (let image of imagesParent) {
                            image.classList.add('no-clicking');
                        }

                        if (similarArray[0] == similarArray[1]) {
                            successMusic.play();
                            AllSimilarArray.push(similarArray[0]);
                            showCounter = 0;
                            for (let image of imagesParent) {
                                if (!AllSimilarArray.includes(image.firstElementChild.classList[0])) {
                                    image.classList.remove('no-clicking');
                                }
                            }
                            if ((AllSimilarArray.length == imagesParent.length / 2)) {
                                clearInterval(setTimeForGame);
                                mainMusic.pause();
                                setTimeout(() => {
                                    document.getElementsByTagName('section')[0].classList.add('opac');
                                    endGame.style.display = 'block';
                                    congrat.textContent = `Congratulations ${yourName}, You made it in `
                                        // checking minutes
                                    if (+minutes.textContent != 0) {
                                        congrat.textContent += `${minutes.textContent} min `;
                                    }
                                    // checking seconds
                                    congrat.textContent += `${seconds.textContent} sec ,`;

                                    // checking errors
                                    if (+wrongTries.textContent == 0) {
                                        congrat.textContent += `Without any error .`;
                                    } else if (+wrongTries.textContent == 1) {
                                        congrat.textContent += `With  1 error .`;
                                    } else {
                                        congrat.textContent += `With ${wrongTries.textContent} errors .`;
                                    }
                                    congratilationsSound.play();
                                }, 2000);
                            }

                        } else {
                            errorMusic.play()
                            setTimeout(() => {
                                for (let i = 0; i < imagesParent.length; i++) {
                                    if (!AllSimilarArray.includes(imagesParent[i].firstElementChild.classList[0])) {
                                        imagesParent[i].firstElementChild.classList.remove('show');
                                        imagesParent[i].lastElementChild.firstElementChild.classList.remove('hide');
                                    }
                                }
                                for (let image of imagesParent) {
                                    image.classList.remove('no-clicking');
                                }
                            }, 500)
                            showCounter = 0;
                            wrongTries.textContent = +wrongTries.textContent + 1;
                        }
                        similarArray = [];
                    }
                }
            }
        }
    }
    // Ranking 
let container = document.querySelector('.container');
statistics.onclick = () => {
    endGame.remove();
    container.remove();
}