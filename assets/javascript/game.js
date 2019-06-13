

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
            "healthPoints": 430,
            "attackPower": 35,
            "skill": "40% 5x Critical",
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 4) {
                    return this.attackPower * 5;
                } else {
                    return this.attackPower;
                }  
            }
        },
        {
            "name": "Thor",
            "imgSrc": "assets/images/thor.png",
            "id": "2",
            "healthPoints": 440,
            "attackPower": 38,
            "skill": "30% 2x Critical",
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 3) {
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
            "healthPoints": 425,
            "attackPower": 40,
            "skill": "20% 2x Critical",
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 2) {
                    return this.attackPower * 2;
                } else {
                    return this.attackPower;
                }  
            }
        },
        {
            "name": "Doctor-Strange",
            "imgSrc": "assets/images/doctor-strange.png",
            "id": "4",
            "healthPoints": 380,
            "attackPower": 18,
            "skill": "30% 3x Critical",
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 3) {
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
            "healthPoints": 390,
            "attackPower": 28,
            "skill": "12+ per attack",
            "increasePower": 0,
            "finalAttackPower": function() {
                if(this.increasePower === 1) {
                    this.attackPower += 12;
                    return this.attackPower;
                } else {
                    this.increasePower = 1;
                    return this.attackPower;
                }
                
                
                
            }
        },
        {
            "name": "Thanos",
            "imgSrc": "assets/images/thanos.png",
            "id": "6",
            "healthPoints": 450,
            "attackPower": 50,
            "skill": "30% 6x Critical",
            "finalAttackPower": function() {
                var random = Math.random() * 10;
                if(random < 3) {
                    return this.attackPower * 6;
                } else {
                    return this.attackPower;
                }  
            }
        }
    ];
    var availableHeroes = [];
    for(var i = 0; i < superheroes.length; i++) {
        availableHeroes.push(Object.assign({}, superheroes[i]));
    }
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

    function appendDiv(id, divToAppend){
        var createDiv = $("<div>");
        var createNameP = $("<p>");
        var createHealthP = $("<p>");
        var createAttackP = $("<p>");
        var createSkillP = $("<p>");

        createDiv.addClass("details-div");
        createNameP.html('<span class="width-95">Hero-Name</span>');
        createHealthP.html('<span class="width-95">Health-points</span>');
        createAttackP.html('<span class="width-95">Attack-power</span>');
        createSkillP.html('<span class="width-95">Passive-skill</span>');

        createDiv.attr("id","character-details");
        createNameP.attr("id","name");
        createHealthP.attr("id","health");
        createAttackP.attr("id","attack");
        createSkillP.attr("id","skill");
        
        var character = availableHeroes.filter(x => x.id === id)[0];
    
        createNameP.append(`<span>:  ${character.name}</span>`);
        createHealthP.append(`<span>:  ${character.healthPoints} pts</span>`);
        createAttackP.append(`<span>:  ${character.attackPower} pts</span>`);
        createSkillP.append(`<span>:  ${character.skill}</span>`);
    
        createDiv.append(createNameP)
           .append(createHealthP)
           .append(createAttackP)
           .append(createSkillP); 

        divToAppend.append(createDiv);
    }
    
    var mousedown = 0;
    function heroesDetails() {
        $(".availableHeroes").on("mouseenter",function() {
            var SelectId = "#" + this.id;
            appendDiv(this.id,$(SelectId));
        });
        
        $(".availableHeroes").on("mousedown",function() {
            mousedown = 1;
        });

        if(mousedown === 1) {
            $(".availableHeroes").on("mouseup",function() {
                $("#character-details").remove();
            });
        } else {
            $(".availableHeroes").on("mouseleave",function() {
                $("#character-details").remove();
            });
        }
    }
    
    function enemydetails() {
        $(".enemy-heroes").on("mouseenter",function() {
            var SelectId = "#" + this.id;
            appendDiv(this.id,$(SelectId));
        });
    
        $(".enemy-heroes").on("mouseleave",function() {
            $("#character-details").remove();
        });
    }

    function showCharacter(characters, classesToAdd, divToPrepend) {
        for(var i = characters.length-1 ; i >= 0; i--) {
            var createDiv = $("<div>");
            var createImg = $("<img>");
            var createNameP = $("<p>");
            var createHealthP = $("<p>");
            
            createDiv.attr("id", characters[i].id);
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
        heroesDetails();
        enemydetails();
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

    attackButton.click(function(e) {
        console.log(enemyHeroPick, checkEnemyHealth);
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
                enemyHeroPick = 0;
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
                        if(playerCharacter.healthPoints < 0) {
                            $("#player-hero").children("#health").text("0");
                            lost(playerCharacter);
                        } else {
                            $("#player-hero").children("#health").text(playerCharacter.healthPoints);
                        }
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

                    
                }   
            },500); 

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
             
        }
    });

    $("#reset").click((e) => {
        $(this).blur();
        
        setTimeout(() => {
            $("#reset").removeClass("reset-btn");
            $("#reset").addClass("reset-btnIdle");
        }, 300);
        $("#reset").addClass("reset-btn");
        
        $("#player-hero").remove();
        $("#enemy-hero").remove();
        $("#attack").addClass("btn");
        $(".enemy-heroes").remove();
        $(".result-win").remove();
        availableHeroes = [];
        for(var i = 0; i < superheroes.length; i++) {
            availableHeroes.push(Object.assign({}, superheroes[i]));
        }
        randomNumArr = [];
        enemyHeroes = [];
        enemyCharacter = {};
        playerCharacter = {};
        checkEnemyHealth = 1;
        attackCheck = 1;
        result = 0;
        enemyHeroPick = 0;
        
        playerCharacterDiv.append(height290Div1);
        
        showCharacter(availableHeroes, "character-div availableHeroes", availableCharacterDiv);
        $(".availableHeroes").on("click",chooseHero);
        chooseCharactersh2.text("Choose Your Character");
    });

    
});

//clickevent, dublicate array.

