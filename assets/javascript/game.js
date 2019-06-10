


        // * Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

$(document).ready(function() {
    var playerCharacterDiv = $("#available-characters");
    var playerHeroDiv = $(".playerhero");
    var enemiesAvailableDiv = $("#enemies-available");
    var attackButton = $("#attack");
    var currentDefenderDiv = $("#current-defender");
    var checkEnemyHealth = 1;
    var superheroes = [
        {
            "name": "Captain-Marvel",
            "imgSrc": "assets/images/captain-marvel.png",
            "id": "1",
            "healthPoints": 100,
            "attackPower": 20,
            "counterAttackPower": 20,
            "finalAttackPower": 0
        },
        {
            "name": "Spider-Man",
            "imgSrc": "assets/images/spider-man.png",
            "id": "2",
            "healthPoints": 100,
            "attackPower": 20,
            "counterAttackPower": 20,
            "finalAttackPower": 0
        },
        {
            "name": "Captain-America",
            "imgSrc": "assets/images/captain-marvel.png",
            "id": "3",
            "healthPoints": 150,
            "attackPower": 28,
            "counterAttackPower": 28,
            "finalAttackPower": 0
        },
        {
            "name": "Doctor-Strange",
            "imgSrc": "assets/images/spider-man.png",
            "id": "4",
            "healthPoints": 90,
            "attackPower": 18,
            "counterAttackPower": 18,
            "finalAttackPower": 0
        },
        {
            "name": "Captain-America",
            "imgSrc": "assets/images/captain-marvel.png",
            "id": "3",
            "healthPoints": 150,
            "attackPower": 28,
            "counterAttackPower": 28,
            "finalAttackPower": 0
        },
        {
            "name": "Doctor-Strange",
            "imgSrc": "assets/images/spider-man.png",
            "id": "4",
            "healthPoints": 90,
            "attackPower": 18,
            "counterAttackPower": 18,
            "finalAttackPower": 0
        }
    ];
    var availableHeroes = [...superheroes];
    var enemyCharacter = {};
    var playerCharacter = {};

    function showCharacter(characters, classesToAdd, divToPrepend) {
        for(var i = characters.length-1 ; i >= 0; i--) {
            var createDiv = $("<div>");
            var createImg = $("<img>");
            var createNameP = $("<p>");
            var createHealthP = $("<p>");
    
            createNameP.text(characters[i].name);
            createImg.attr("src", characters[i].imgSrc);
            createImg.addClass("character-img");
            createHealthP.attr("id","health");
            createHealthP.text(characters[i].healthPoints);
    
            createDiv.append(createNameP);
            createDiv.append(createImg);
            createDiv.append(createHealthP);
            createDiv.addClass(classesToAdd);
            createDiv.attr("data-id", characters[i].id);
    
            divToPrepend.prepend(createDiv);
        }
    }

    function enemy(characters, classesToAdd, divToPrepend) {
        
            var createDiv = $("<div>");
            var createImg = $("<img>");
            var createNameP = $("<p>");
            var createHealthP = $("<p>");
    
            createNameP.text(characters.name);
            createImg.attr("src", characters.imgSrc);
            createImg.addClass("character-img");
            createHealthP.attr("id","health");
            createHealthP.text(characters.healthPoints);
    
            createDiv.append(createNameP);
            createDiv.append(createImg);
            createDiv.append(createHealthP);
            createDiv.addClass(classesToAdd);
            createDiv.attr("data-id", characters.id);
            createDiv.attr("id", "enemy-hero");
    
            divToPrepend.prepend(createDiv);
    }

    showCharacter(availableHeroes, "character-div playerHeroes", playerCharacterDiv)

    $(".playerHeroes").on("click",function(e) {
        playerCharacter = availableHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
        availableHeroes.splice(availableHeroes.indexOf(playerCharacter),1);

        if($(this).attr("data-id") === playerCharacter.id) {
            $(this).attr("id", "player-hero");
            $(this).removeClass("playerHeroes");
        }
        $(".playerHeroes").remove();

        showCharacter(availableHeroes, "character-div enemyHeroes", enemiesAvailableDiv);

        $(".enemyHeroes").on("click",function(e) {
            if(checkEnemyHealth === 1) {
                checkEnemyHealth = 0;
                enemyCharacter = availableHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
            
            
                availableHeroes.splice(availableHeroes.indexOf(enemyCharacter),1);
    
                if($(this).attr("data-id") === enemyCharacter.id) {
                    $(this).addClass("enemyHero");
                }
                console.log(enemyCharacter);
                enemy(enemyCharacter, "character-div", currentDefenderDiv);
                $(".enemyHero").remove();
            }
            
        });

        
        
   
    });

   


    attackButton.click(function(e) {
        e.preventDefault();
        
        enemyCharacter.healthPoints -= playerCharacter.attackPower;
        if(enemyCharacter.healthPoints <= 0) {
            $("#enemy-hero").children("#health").text("0");
            $("#enemy-hero").remove();
            checkEnemyHealth = 1;
        } else {
            $("#enemy-hero").children("#health").text(enemyCharacter.healthPoints);
        }
        setTimeout(function() {  
            if(enemyCharacter.healthPoints > 0) {
                playerCharacter.healthPoints -= enemyCharacter.attackPower;
                if(playerCharacter.healthPoints < 0) {
                    $("#player-hero").children("#health").text("0");
                    console.log("you lost");
                } else {
                    $("#player-hero").children("#health").text(playerCharacter.healthPoints);
                }
            }   
        },500);

        
        
    });


    
    // * Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
    //   * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
    // * The enemy character only has `Counter Attack Power`. 

    //   * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

    // * The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

    // * No characters in the game can heal or recover Health Points. 

    //   * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

    // * Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
});

