


        // * Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

$(document).ready(function() {
    var yourCharacterh2 = $("#your-character");
    var defenderh2 = $("#defender");
    var chooseCharactersh2 = $("#choose-characters");
    var availableCharacterDiv = $("#available-characters");
    var playerCharacterDiv = $("#player-character");
    var attackButton = $("#attack");
    var currentDefenderDiv = $("#current-defender");
    var checkEnemyHealth = 1;
    var attackCheck = 1;
    var result = 0;
    var enemyHeroPick = 0;
    var superheroes = [
        {
            "name": "Captain-Marvel",
            "imgSrc": "assets/images/captain-marvel.png",
            "id": "1",
            "healthPoints": 210,
            "attackPower": 25,
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 2) {
                    return this.attackPower * 3;
                } else {
                    return this.attackPower;
                }  
            }
        },
        {
            "name": "Thor",
            "imgSrc": "assets/images/thor.png",
            "id": "2",
            "healthPoints": 200,
            "attackPower": 28,
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 2.5) {
                    return this.attackPower * 2;
                } else {
                    return this.attackPower;
                }  
            }
        },
        {
            "name": "Captain-America",
            "imgSrc": "assets/images/captain-america.png",
            "id": "3",
            "healthPoints": 190,
            "attackPower": 28,
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 2) {
                    return this.attackPower * 3;
                } else {
                    return this.attackPower;
                }  
            }
        },
        {
            "name": "Doctor-Strange",
            "imgSrc": "assets/images/doctor-strange.png",
            "id": "4",
            "healthPoints": 150,
            "attackPower": 18,
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 2) {
                    return this.attackPower * 3;
                } else {
                    return this.attackPower;
                }  
            }
        },
        {
            "name": "Iron-Man",
            "imgSrc": "assets/images/iron-man.png",
            "id": "5",
            "healthPoints": 190,
            "attackPower": 28,
            "increasePower": false,
            "finalAttackPower": function() {
                if(this.increasePower) {
                    this.attackPower += 6;
                    return this.attackPower;
                } else {
                    return this.attackPower;
                }
                
                
                
            }
        },
        {
            "name": "Thanos",
            "imgSrc": "assets/images/thanos.png",
            "id": "6",
            "healthPoints": 220,
            "attackPower": 20,
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 2) {
                    this.attackPower = 300;
                    return this.attackPower;
                } else {
                    this.attackPower = 30
                    return this.attackPower;
                }  
            }
        }
    ];
    var availableHeroes = [...superheroes];
    var randomNumArr = [];
    var enemyHeroes = [];
    var enemyCharacter = {};
    var playerCharacter = {};
    var height290Div1 = $("<div>");
    height290Div1.addClass("height-290");
    playerCharacterDiv.append(height290Div1);
    yourCharacterh2.text("Your Character");
    defenderh2.text("Defender");
    chooseCharactersh2.text("Choose Your Character");
    $("#attack").text("Attack");

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
    
            divToPrepend.prepend(createDiv);
        }
    }

    function character(characters, classesToAdd, divToPrepend, id) {
        
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
            createDiv.attr("id", id);
    
            divToPrepend.append(createDiv);
    }

    function chooseEnemy() {

    }
    
    function win(character, heroes) {
        if(character.healthPoints <= 0 && heroes.length === 0){
            chooseCharactersh2.text("Result");
            availableCharacterDiv.append($('<h2 class="result-win">You Win!</h2>'));
            result = 1;
        }
    }

    function lost(character) {
        if(character.healthPoints <= 0) {
            $(".enemy-heroes").remove();
            chooseCharactersh2.text("Result");
            availableCharacterDiv.append($('<h2 class="result-win">You Lost!</h2>'));
            result = 1;
        }
    }   

    showCharacter(availableHeroes, "character-div availableHeroes", availableCharacterDiv);

    function chooseHero(e) {
        if(playerChose = 1) {
            playerCharacter = availableHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
            availableHeroes.splice(availableHeroes.indexOf(playerCharacter),1);
            character(playerCharacter, "character-div", playerCharacterDiv, "player-hero");
            playerChose = 0;
            height290Div1.remove();
            chooseCharactersh2.text("Choose Defender");
            $(".availableHeroes").remove();
            for(var i = 0; randomNumArr.length < 3; i++) {
                var random = Math.floor(Math.random() * availableHeroes.length);
                if(!randomNumArr.includes(random)) {
                    randomNumArr.push(random);
                }
                
            }
            enemyHeroes = availableHeroes.filter(x => randomNumArr.includes(availableHeroes.indexOf(x)));
            showCharacter(enemyHeroes, "character-div enemy-heroes", availableCharacterDiv);
        }
        
        $(".enemy-heroes").click(function(e) {
            if(checkEnemyHealth === 1) {
                checkEnemyHealth = 0;
                enemyHeroPick = 1;
                enemyCharacter = enemyHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
                enemyHeroes.splice(enemyHeroes.indexOf(enemyCharacter),1);
                character(enemyCharacter, "character-div", currentDefenderDiv, "enemy-hero");
            $(".enemy-heroes").remove();
            showCharacter(enemyHeroes, "character-div enemy-heroes", availableCharacterDiv);   
            }
            
        });
    };

    $(".availableHeroes").on("click",chooseHero);
    // $(".availableHeroes").on("click",function(e) {
    //     // if(playerChose = 1) {
    //     //     playerCharacter = availableHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
    //     //     availableHeroes.splice(availableHeroes.indexOf(playerCharacter),1);
    //     //     character(playerCharacter, "character-div", playerCharacterDiv, "player-hero");
    //     //     playerChose = 0;
    //     //     height290Div1.remove();
    //     //     chooseCharactersh2.text("Choose Defender");
    //     //     $(".availableHeroes").remove();
    //     //     for(var i = 0; randomNumArr.length < 3; i++) {
    //     //         var random = Math.floor(Math.random() * availableHeroes.length);
    //     //         if(!randomNumArr.includes(random)) {
    //     //             randomNumArr.push(random);
    //     //         }
                
    //     //     }
    //     //     enemyHeroes = availableHeroes.filter(x => randomNumArr.includes(availableHeroes.indexOf(x)));
    //     //     showCharacter(enemyHeroes, "character-div enemy-heroes", availableCharacterDiv);
    //     // }
        
    //     // $(".enemy-heroes").click(function(e) {
            
    //     //     if(checkEnemyHealth === 1) {
    //     //         checkEnemyHealth = 0;
    //     //         enemyCharacter = enemyHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
    //     //         enemyHeroes.splice(enemyHeroes.indexOf(enemyCharacter),1);
    //     //         character(enemyCharacter, "character-div", currentDefenderDiv, "enemy-hero");
    //     //     $(".enemy-heroes").remove();
    //     //     showCharacter(enemyHeroes, "character-div enemy-heroes", availableCharacterDiv);   
    //     //     }
            
    //     // });
        
    // });

    attackButton.click(function(e) {
        $(this).blur();
        if(attackCheck === 1 && result === 0 && enemyHeroPick === 1) {
            $("#enemy-hero").addClass("attack-background");
            var playerAttack = playerCharacter.finalAttackPower();
            enemyCharacter.healthPoints -= playerAttack;
            yourCharacterh2.text(`Attack with ${playerAttack} pts.`);
            attackCheck = 0;
            $("#attack").text("Wait...");
            $("#attack").removeClass("btn");
            $("#attack").addClass("btnIdle");
            setTimeout(() => {
                $("#enemy-hero").removeClass("attack-background");
            },300);
            
            if(enemyCharacter.healthPoints <= 0) {
                $("#enemy-hero").children("#health").text("0");
                win(enemyCharacter, enemyHeroes);
                $("#enemy-hero").remove();
                checkEnemyHealth = 1;
                setTimeout(() => {
                    defenderh2.text(`Defender`);
                    attackCheck = 1;
                    $("#attack").text("Attack");
                    yourCharacterh2.text(`Your Character`);
                    $("#attack").removeClass("btnIdle");
                    $("#attack").addClass("btn");
                },2000);
            } else {
                
            
                $("#enemy-hero").children("#health").text(enemyCharacter.healthPoints);
            }
            setTimeout(function() {  
                if(enemyCharacter.healthPoints > 0) {
                    var enemyAttack = enemyCharacter.finalAttackPower();
                    playerCharacter.healthPoints -= enemyAttack;
                    
                    setTimeout(() => {
                        defenderh2.text(`Counterattack with ${enemyAttack} pts.`);
                        $("#player-hero").addClass("attack-background");
                    },500);

                    setTimeout(() => {
                        $("#player-hero").removeClass("attack-background");
                    },700);

                    setTimeout(() => {
                        defenderh2.text(`Defender`);
                        attackCheck = 1;
                        $("#attack").text("Attack");
                        yourCharacterh2.text(`Your Character`);
                        $("#attack").removeClass("btnIdle");
                        $("#attack").addClass("btn");
                    },2000);

                    if(playerCharacter.healthPoints < 0) {
                        $("#player-hero").children("#health").text("0");
                        lost(playerCharacter);
                    } else {
                        $("#player-hero").children("#health").text(playerCharacter.healthPoints);
                    }
                }   
            },500); 

            $(".enemy-heroes").click(function(e) {
                
                if(checkEnemyHealth === 1) {
                    checkEnemyHealth = 0;
                    enemyCharacter = enemyHeroes.filter(x => x.id === $(this).attr("data-id"))[0];
                    enemyHeroes.splice(enemyHeroes.indexOf(enemyCharacter),1);
                    character(enemyCharacter, "character-div", currentDefenderDiv, "enemy-hero");
                $(".enemy-heroes").remove();
                showCharacter(enemyHeroes, "character-div enemy-heroes", availableCharacterDiv);   
                }
                
            });
            if (playerCharacter.hasOwnProperty("increasePower")) {
                playerCharacter.increasePower = true;
            } else if(enemyCharacter.hasOwnProperty("increasePower")) {
                enemyCharacter.increasePower = true;
            }
        }
    });

    $("#reset").click((e) => {
        e.preventDefault();
        result = 0;
        availableHeroes = [...superheroes];
        randomNumArr = [];
        enemyHeroes = [];
        enemyCharacter = {};
        playerCharacter = {};
        $("#player-hero").remove();
        playerCharacterDiv.append(height290Div1);
        $("#enemy-hero").remove();
        $("#attack").addClass("btn");
        $(".enemy-heroes").remove();
        showCharacter(availableHeroes, "character-div availableHeroes", availableCharacterDiv);
        $(".availableHeroes").on("click",chooseHero);
        chooseCharactersh2.text("Choose Your Character");
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

