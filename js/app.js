// Create a list that holds all of your cards

   const deck = 
   ['fa-diamond',
    'fa-diamond',
    'fa-paper-plane-o', 
    'fa-paper-plane-o', 
    'fa-anchor', 
    'fa-anchor', 
    'fa-bolt', 
    'fa-bolt', 
    'fa-cube', 
    'fa-cube',
    'fa-leaf',
    'fa-leaf',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bomb',
    'fa-bomb' ];

   let openCard = [];
   let moves = 0;
   let pairs = 0;
   let moveText = document.querySelector(".moves");
   let time = document.querySelector(".timer");
   let seconds = 0; minutes = 0; hours = 0;
   let t;
   let stars = 3;


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(deck) {
    var currentIndex = deck.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temporaryValue;
        }
    
        return deck;
    } 
	
	// shuffles cards and creates new html
	function createGame() {
    let cardList = shuffle(deck);
        cardList.forEach(function(cardName) {      
            $(".deck").append('<li class="card"><i class="fa ' +cardName + '"></i></li>');
        });   		  
    }

	// displays cards 
    function displayCards() {  
        $(".card").on("click", function() {
        if ($(this).hasClass("open show")) {return;}

        $(this).toggleClass("open show");
        openCard.push($(this));
        moves++;
        moveText.textContent = moves;
        if(openCard.length === 2) {
            checkifCardsMatch(); 
        }
        score(); 
    });
}
    
    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    time.textContent = 'Time : ' + (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
    
    function timer() {
    t = setTimeout(add, 1000);
}

    //Check if 2 cards match
    function checkifCardsMatch() {
        if(openCard[0][0].firstChild.className === openCard[1][0].firstChild.className) {
                openCard[0][0].classList.add("match");
                openCard[1][0].classList.add("match");
                pairs++;
                setTimeout(endGame, 300);
                disableClick();
            } else {
                setTimeout(cardsDontMatch, 300);
            } 
            openCard = [];
    }

    function cardsDontMatch() {
        $(".card").removeClass("show open");
    }

    function disableClick() {
        openCard.forEach(function(card) {
                    card.off('click');
                });
    }

    function resetGame() {
        $('.fa-repeat').on('click', function() {
            location.reload();
        });
    }

    // displaying stars
    function score() {
         if (moves === 16) {
            $('#thirdStar').css("display", "none");   
            stars = 2;
        } else if (moves === 32) {
            $('#thirdStar').css("display", "none");
            $('#secondStar').css("display", "none");
            stars = 1;
        } else if (moves >= 50) {
            $('#thirdStar').css("display", "none");
            $('#secondStar').css("display", "none");
            $('#firstStar').css("display", "none");
            stars = 0;
        }
    }
    
    function endGame() {
        if (pairs === 8) {
            clearTimeout(t);
            displayScoreMessage();
            console.log("U HAVE WON!!!");
        }
    }

    function displayScoreMessage() {
        swal({
        title: 'Congratulations, you Won!',
        html: 'You have won ' + stars + ' star(s)<br>' +
        'Moves: ' + moves +'<br>' + time.textContent + 
        '<br> Do you want to play again?',
        type: 'success',
        confirmButtonText: 'Go back to game'
    })
        }

    $('#start').on('click', function() {
        timer();
        createGame();
        displayCards();
        $('#start').css("display", "none");
    });

   

    resetGame();
 


