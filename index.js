let xp = 0
let hp = 100
let coin = 10
let swordLimit = 0
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
        sell: 0,
        critic: Math.random() <= 0.01,
        limit: 0
    },
    {
        name: " dagger",
        power: 15,
        price: 20,
        sell: 10,
        critic: Math.random() <= 0.1,
        limit: 0
    },
    {
        name: " sword" ,
        power: 35,
        price: 50,
        sell: 25,
        critic: Math.random() <= 0.2,
        limit: 0
    },
    {
        name: " Fire wand",
        power: 150,
        price: 250,
        sell: 125,
        critic: Math.random() <= 0.35,
        limit: 0
    }
]

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 20,
        coin: 5,
        attack: 5,
        critic: Math.random() <= 0.05
    },
    {
        name: "beast",
        level: 8,
        health: 80,
        coin: 20,
        attack: 20,
        critic: Math.random() <= 0.1
    },
    {
        name: "Drakorath",
        level: 20,
        health: 600,
        attack: 75,
        coin: 1000,
        critic: Math.random() <= 0.2
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
        "button text": ["Buy Consumable", `Buy Weapon`, "Go to Town Square"],
        "button functions": [buyConsumable, buyWeapon, goTown],
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
        "button functions": [attack, spell, run],
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
        "button text": ["Lore Page 1", "Lore Page 2", "Start your quest"],
        "button functions": [page1, page2, start],
        text: "Welcome to Dragon Slayer. Defeat the dragon that holds the town captive.<br><br> Will you rise as the legendary Dragon Slayer, or succumb to Drakorath's darkness? <br><br><br><br>Begin your quest by using the buttons above."
    },
    {
        name: "Page 2",
        "button text": ["Back", "Lore Page 3", "Start"],
        "button functions": [welcome, page3, start],
        text: "As you journey through the town, you encounter weak monsters that Drakorath has unleashed upon the streets. With each victory against these minions, you gain experience and collect coins, slowly growing stronger and more skilled in combat. <br><br> With the coins you earn, you visit the local blacksmith and purchase better swords, each one imbued with magical properties that enhance your abilities. These swords become symbols of your growing strength and determination to defeat Drakorath."
    },
    {
        name: "Consumables",
        "button text": ["Health Potion (10 coin)", "Fire Scroll (50 coin)", "Go back"],
        "button functions": [buyHealth, buyFire, goStore],
        text: "Choose one of the above to buy."
    },
    {
        name: "Weapons",
        "button text": ["Buy sword (50 coin)", "Buy Fire wand (250 coin)", "Go back"],
        "button functions": [buySword, buyWand, goStore],
        text: "Choose one of the above to buy."
    },
    {
        name: "Run Town",
        "button text": ["Go to store", "Go to dungeon", "Fight the dragon"],
        "button functions": [goStore, goDungeon, fightDrakorath],
        text: "Your run attempt was successful!"
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

function buyConsumable() {
    update(locations[9])
}

function buyFire() {

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
    function buyWeapon() {
        update(locations[10])
        text.innerHTML = "As you make your selections, you realize that you've purchased everything the store has to offer. <br><br> Your inventory now includes a variety of powerful weapons and useful items, giving you a significant advantage in your quest. <br><br>With your newfound gear, you feel more prepared than ever to face the challenges ahead."

    }

   /* function buyDagger() {
        if (coin >= weapons[1].price){
            coin -= weapons[1].price
            coinText.textContent = coin
            text.innerHTML = `As you purchase the dagger, you feel its weight in your hand, its blade gleaming in the light. <br> With ${weapons[1].power} power, it promises to be a formidable weapon against your foes. `
        }
        else {
            text.innerHTML = "As you look through the store's offerings, you realize you're short on coins and can't afford to buy anything new. <br><br>You decide to stick with your current gear for now, hoping to earn more coins in the future."
        }
    }*/

    function buySword() {
        if (coin >= weapons[2].price && swordLimit < 1) {
            coin -= weapons[2].price
            coinText.textContent = coin
            text.innerHTML = `As you purchase the sword, you feel its weight in your hand, its blade gleaming in the light. <br> With ${weapons[2].power} power, it promises to be a formidable weapon against your foes. `
            weapons[2].limit++
            middleButton.innerText = "Sell sword (25 coins)"
        }
        else if (weapons[2].limit === 1) {
            coin += weapons[2].sell
            coinText.textContent = coin
            text.innerHTML = `You sell your sword, adding a few coins to your purse.<br><br>`
            weapons[2].limit--
            middleButton.innerText = "Buy sword (50 coins)"
        }
        else {
            text.innerHTML = "As you look through the store's offerings, you realize you're short on coins and can't afford to buy anything new. <br><br>You decide to stick with your current gear for now, hoping to earn more coins in the future."
        }
    }

    function buyWand() {
        if (coin >= weapons[3].price) {
            coin -= weapons[3].price
            coinText.textContent = coin
            text.innerHTML = `As you purchase the wand, you feel its weight in your hand, its blade gleaming in the light. <br> With ${weapons[3].power} power, it promises to be a formidable weapon against your foes. `
        }
        else {
            text.innerHTML = "As you look through the store's offerings, you realize you're short on coins and can't afford to buy anything new. <br><br>You decide to stick with your current gear for now, hoping to earn more coins in the future."
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
    text.innerHTML += ` You attack the monster.`
    hp -= monsters[fighting].attack
    monsterHealth -= weapons[inventory].power
    hpText.textContent = hp
    monsterHealthText.innerHTML = monsterHealth
    if (hp <= 0){
        lose()
    }
    else if (monsterHealth <= 0 && hp > 0){
        fighting === 2 ? winGame() : defeatMonster()
    }
}

function spell() {
    text.innerHTML = `You're going to cast a spell against ${monsters[fighting].name}.`
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

function runTown() {
    update(locations[11])
}

function run() {
    if (Math.random() <= 0.6) {
        runTown()
    }
    else {
        hp -= monsters[fighting].attack * 1.5
        hpText.textContent = hp
        text.innerHTML = "Your running attempt failed that cause you to take more damage!"
    }
}