let xp = 0
let hp = 100
let coin = 1050
let currentWeapon = 0
let fighting
let monsterHealth
let inventory = [`stick`]

const xpText = document.getElementById('xp')
const hpText = document.getElementById('hp')
const coinText = document.getElementById('coin')
const leftButton = document.getElementById('button1')
const middleButton = document.getElementById('button2')
const rightButton = document.getElementById('button3')
const text  = document.getElementById('story')
const monsterStats = document.getElementById('monsterStat')
const monsterNameText = document.getElementById('monsterNameText')
const monsterHealthText = document.getElementById("monsterHpText")

const weapons = [
    {
        name: "stick",
        power: 5,
        price: 0,
        sell: 0
    },
    {
        name: " dagger",
        power: 15,
        price: 20,
        sell: 10
    },
    {
        name: " sword" ,
        power: 35,
        price: 50,
        sell: 25
    },
    {
        name: " Fire wand",
        power: 150,
        price: 250,
        sell: 150
    }
]

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 20,
        coin: 5,
        attack: 5
    },
    {
        name: "beast",
        level: 8,
        health: 80,
        coin: 20,
        attack: 20
    },
    {
        name: "Drakorath",
        level: 20,
        health: 600,
        attack: 75,
        coin: 1000
    }
]

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", "Go to dungeon", "Fight the dragon"],
        "button functions": [goStore, goDungeon, fightDrakorath],
        text: `When you enter the bustling Town Square, your eyes are drawn to a weather-worn sign that reads "store" <br><br> It beckons you with the promise of powerful swords and essential supplies.<br><br>Will you venture inside and equip yourself for the battles ahead?`
    },
    {
        name: "Store",
        "button text": ["Buy a health potion (10 coin)", `Buy weapon (20 coin)`, "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: `As you step through the creaking door, the scent of leather and steel fills your nostrils. <br> <br> Shelves line the walls, displaying an array of gleaming swords and potions. <br><br>Behind the counter, a grizzled blacksmith looks up, nodding in greeting. Welcome to the store, where heroes are made. <br><br>What will you buy to aid you in your quest?`
    },
    {
        name: "Dungeon",
        "button text": ["Fight slime", "Fight beast", "Go to Town Square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "As you enter the dimly lit cave, two creatures emerge—a slimy slime and a fierce beast—blocking your path. <br><br>The slime is slow and vulnerable, while the beast is agile and powerful. Your choice will decide the outcome. Will you battle them?"
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You face a menacing monster, readying yourself for battle."
    },
    {
        name: "Kill Monster",
        "button text": ["Fight more slime", "Fight more beast", "Go to Town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: `As the monster's lets out a final scream, you gain experience points and discover a few coins among its remains.`
    },
    {
        name: "Lose",
        "button text": ["Replay?", "More about Lore", "Credits"],
        "button functions": [restart, moreLore, credits],
        text: "Despite your best efforts, the monster's relentless assault proves too much to handle. As its final blow lands, you feel your strength wane, and darkness overtakes you. Your vision blurs, and the sounds of battle fade away. You have fallen in battle, your journey cut short. The world fades to black as your adventure comes to an end."
    },
    {
        name: "Win",
        "button text": ["Replay?", "More about Lore", "Credits"],
        "button functions": [restart, moreLore, credits],
        text: "With a final, decisive blow, you vanquish Drakorath, the ancient dragon. The beast lets out a deafening roar before collapsing to the ground, defeated. <br>As you catch your breath, you realize that you have emerged victorious, having conquered the great threat that loomed over Serenity's Rest. <br><Br>The townsfolk cheer and celebrate your triumph, grateful for your bravery and skill. You have defeated Drakorath, becoming the legendary Dragon Slayer."
    },
    {
        name: "Welcoming",
        "button text": ["Lore Page 1", "Lore Page 2", "Start"],
        "button functions": [page1, page2, start],
        text: "Welcome to Dragon Slayer. Defeat the dragon that holds the town captive.<br><br> Will you rise as the legendary Dragon Slayer, or succumb to Drakorath's darkness? <br><br><br><br>Begin your quest by using the buttons above."
    },
    {
        name: "Page 2",
        "button text": ["Back", "Lore Page 3", "Start"],
        "button functions": [welcome, page3, start],
        text: "As you journey through the town, you encounter weak monsters that Drakorath has unleashed upon the streets. With each victory against these minions, you gain experience and collect coins, slowly growing stronger and more skilled in combat. <br><br> With the coins you earn, you visit the local blacksmith and purchase better swords, each one imbued with magical properties that enhance your abilities. These swords become symbols of your growing strength and determination to defeat Drakorath."
    }
]

middleButton.onclick = welcome

function update(location) {
    monsterStats.style.display = "none"
    leftButton.innerText = location["button text"][0]
    middleButton.innerText = location["button text"][1]
    rightButton.innerText = location["button text"][2]
    leftButton.onclick = location["button functions"][0]
    middleButton.onclick = location["button functions"][1]
    rightButton.onclick = location["button functions"][2]
    text.innerHTML = location.text
}

function goTown() {
    update(locations[0])
}

function goStore() {
    update(locations[1])
}

function goDungeon() {
    update(locations[2])
}

function buyHealth() {
        if (coin >= 10){
            coin -= 10
            hp += 10
            hpText.textContent = hp
            coinText.textContent = coin
            text.innerHTML = "You carefully select a small vial containing a shimmering red liquid—the renowned health potion. <br><br> With a quick sip, you feel a surge of vitality as your wounds begin to heal. <br><br>Your health increases by 10 points, fortifying you for the challenges that lie ahead."
        }
        else{
            text.innerHTML = "As you reach for the health potion, you realize you don't have enough coins to make the purchase. Disappointed, you decide to save your coins for another time, keeping your health at its current level for now."
        }
    }

    function buyWeapons() {
    update(locations[9])
    }


    function buyWeapon() {
        if (currentWeapon < weapons.length - 2) {
            if (coin >= weapons[currentWeapon + 1].price) {
                coin -= weapons[currentWeapon + 1].price
                currentWeapon += 1
                coinText.textContent = coin;
                let newWeapon = weapons[currentWeapon].name
                let weaponDamage = weapons[currentWeapon].power
                text.innerHTML = `As you purchase the ${newWeapon}, you feel its weight in your hand, its blade gleaming in the light. <br> With ${weaponDamage} power, it promises to be a formidable weapon against your foes. `
                text.innerHTML += ` <br><br>You add it to your inventory, alongside your trusty ${inventory} <br><br>`
                inventory.push(newWeapon)
                text.innerHTML += `Inventory: ${inventory}`
                middleButton.innerText = `Buy weapon (${weapons[currentWeapon + 1].price} coin)`
            } else {
                text.innerHTML = "As you look through the store's offerings, you realize you're short on coins and can't afford to buy anything new. <br><br>You decide to stick with your current gear for now, hoping to earn more coins in the future."
            }
        }
        else {
            text.innerHTML = "As you make your selections, you realize that you've purchased everything the store has to offer. <br><br> Your inventory now includes a variety of powerful weapons and useful items, giving you a significant advantage in your quest. <br><br>With your newfound gear, you feel more prepared than ever to face the challenges ahead."
            middleButton.innerText = `Sell weapon for ${weapons[currentWeapon + 1].sell}`
            middleButton.onclick = sellWeapon;
        }
    }

    function sellWeapon() {
        if (inventory.length > 1) {
            coin += weapons[currentWeapon + 1].sell
            coinText.textContent = coin
            let currentWeapon = inventory.shift()
            text.innerHTML = `You sell your ${currentWeapon}, adding a few coins to your purse.<br><br>`
            text.innerHTML += `Inventory: ${inventory}`
        }
        else {
            text.innerHTML = "You decide against selling your only weapon, realizing the importance of having it for your journey.<br><br>"
            text.innerHTML += `Inventory: ${inventory}`
        }
    }

function fightSlime() {
    fighting = 0
    goFight()
}

function fightBeast() {
    fighting = 1
    goFight()
}

function fightDrakorath() {
    fighting = 2
    goFight()
}

function goFight() {
    update(locations[3])
    monsterHealth = monsters[fighting].health
    monsterStats.style.display = "flex"
    monsterNameText.innerHTML = monsters[fighting].name
    monsterHealthText.textContent = monsterHealth
}

function attack() {
    text.innerHTML = `The ${monsters[fighting].name} attacks.`
    text.innerHTML += ` You attack it with your ${weapons[currentWeapon].name}.`
    hp -= monsters[fighting].attack
    monsterHealth -= weapons[currentWeapon].power
    hpText.textContent = hp
    monsterHealthText.innerHTML = monsterHealth
    if (hp <= 0){
        lose()
    }
    else if (monsterHealth <= 0 && hp > 0){
        fighting === 2 ? winGame() : defeatMonster()
    }
}

function dodge() {
    text.innerHTML = `You swiftly dodge the ${monsters[fighting].name} attack, narrowly avoiding its strike.`
}

function defeatMonster() {
    coin += Math.floor(monsters[fighting].level * 2.7)
    coinText.textContent = coin
    xp += monsters[fighting].level
    xpText.textContent = xp
    update(locations[4])
}

function lose() {
    update(locations[5])
}

function winGame() {
    update(locations[6])
}

function restart() {
    xp = 0
    hp = 100
    coin = 50
    currentWeapon = 0
    inventory = ['stick']
    coin.textContent = coin
    xpText.textContent = xp
    hpText.textContent = hp
    start()
}

function credits() {
    text.innerHTML = "Congratulations on completing your adventure in this fantastical realm! Your journey through these lands, crafted by Yigit Ocak. From battling fierce monsters to acquiring legendary weapons, your deeds will be remembered in the annals of gaming history. May your next adventure be as thrilling as this one!"
}

function moreLore() {
    text.innerHTML = "Coming soon..."
}

function welcome() {
    update(locations[7])
    leftButton.style.display= "flex"
    rightButton.style.display= "flex"
}

function page1() {
    text.innerHTML = "In the realm of Eldoria, the peaceful town of Serenity's Rest is under siege by the great dragon, Drakorath the Dreaded. With its fiery breath and iron scales, Drakorath has enslaved the townsfolk, bringing fear and despair to all.<br><br> You, a humble villager with a heart full of courage, have heard the call for heroes to rise against this ancient menace. Armed with nothing but a basic sword and a determination to save your home, you set out to the Town Square, where Drakorath's presence looms large."
}

function page2() {
    update(locations[8])
}

function page3() {
    text.innerHTML = "Your journey is fraught with danger, but with each monster you defeat and each sword you acquire, you move closer to your ultimate goal: to confront Drakorath and free Serenity's Rest from its grip of fear. <br><br>Will you become the legendary Dragon Slayer, or will Drakorath's darkness consume you?"
}

function start() {
    goTown()
}