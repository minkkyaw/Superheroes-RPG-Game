


        // * Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

$(document).ready(function() {
    var playerCharacterDiv = $("#available-characters");
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
            "name": "Thor",
            "imgSrc": "assets/images/thor.png",
            "id": "2",
            "healthPoints": 100,
            "attackPower": 20,
            "counterAttackPower": 20,
            "finalAttackPower": 0
        },
        {
            "name": "Captain-America",
            "imgSrc": "assets/images/captain-america.png",
            "id": "3",
            "healthPoints": 150,
            "attackPower": 28,
            "counterAttackPower": 28,
            "finalAttackPower": 0
        },
        {
            "name": "Doctor-Strange",
            "imgSrc": "assets/images/doctor-strange.png",
            "id": "4",
            "healthPoints": 90,
            "attackPower": 18,
            "counterAttackPower": 18,
            "finalAttackPower": 0
        },
        {
            "name": "Iron-Man",
            "imgSrc": "assets/images/iron-man.png",
            "id": "4",
            "healthPoints": 150,
            "attackPower": 28,
            "counterAttackPower": 28,
            "finalAttackPower": 0
        },
        {
            "name": "Thanos",
            "imgSrc": "assets/images/thanos.png",
            "id": "5",
            "healthPoints": 90,
            "attackPower": 18,
            "counterAttackPower": 18,
            "finalAttackPower": 0
        }
    ];
    var availableHeroes = [...superheroes];
    var enemyCharacter = {};
    var playerCharacter = {};
    var height290Div1 = $("<div>");
    height290Div1.addClass("height-290");
    var height290Div2 = $("<div>");
    height290Div2.addClass("height-290");

    enemiesAvailableDiv.append(height290Div1);
    currentDefenderDiv.append(height290Div2);

    function showCharacter(characters, classesToAdd, divToPrepend) {
        for(var i = characters.length-1 ; i >= 0; i--) {
            var createDiv = $("<div>");
            var createImg = $("<img>");
            var createNameP = $("<p>");
            var createHealthP = $("<p>");
    
            createNameP.text(characters[i].name);
            createNameP.addClass("p-padding");
            createImg.attr("src", characters[i].imgSrc);
            createImg.addClass("character-img");
            createHealthP.attr("id","health");
            createHealthP.addClass("p-padding");
            createHealthP.text(characters[i].healthPoints);
    
            createDiv.append(createNameP);
            createDiv.append(createImg);
            createDiv.append(createHealthP);
            createDiv.addClass(classesToAdd);
            createDiv.attr("data-id", characters[i].id);
    
            divToPrepend.append(createDiv);
        }
    }

    function enemy(characters, classesToAdd, divToPrepend) {
        
            var createDiv = $("<div>");
            var createImg = $("<img>");
            var createNameP = $("<p>");
            var createHealthP = $("<p>");
    
            createNameP.text(characters.name);
            createNameP.addClass("p-padding");
            createImg.attr("src", characters.imgSrc);
            createImg.addClass("character-img");
            createHealthP.attr("id","health");
            createHealthP.addClass("p-padding");
            createHealthP.text(characters.healthPoints);
    
            createDiv.append(createNameP);
            createDiv.append(createImg);
            createDiv.append(createHealthP);
            createDiv.addClass(classesToAdd);
            createDiv.attr("data-id", characters.id);
            createDiv.attr("id", "enemy-hero");
    
            divToPrepend.append(createDiv);
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
        height290Div1.remove();
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
           if(availableHeroes.length === 0) {
               enemiesAvailableDiv.append(height290Div);
           } 
        });

        
        
   
    });

   


    attackButton.click(function(e) {
        $("#enemy-hero").addClass("attack-background");
        setTimeout(() => {
            $("#enemy-hero").removeClass("attack-background");
        },300);
        enemyCharacter.healthPoints -= playerCharacter.attackPower;
        if(enemyCharacter.healthPoints <= 0) {
            $("#enemy-hero").children("#health").text("0");
            $("#enemy-hero").remove();
            checkEnemyHealth = 1;
        } else {
            
        setTimeout(() => {
            $("#player-hero").addClass("attack-background");
        },300);
        setTimeout(() => {
            $("#player-hero").removeClass("attack-background");
        },600);
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

