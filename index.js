let xp = 0
let hp = 100
let coin = 150
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

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: " dagger",
        power: 30
    },
    {
        name: " Iron sword" ,
        power: 50
    },
    {
        name: " Fire wand",
        power: 100
    }
]

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "beast",
        level: 8,
        health: 60
    },
    {
        name: "Drakorath",
        level: 20,
        health: 300
    }
]

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", "Go to cave", "Fight the dragon"],
        "button functions": [goStore, goDungeon, fightDrakorath],
        text: `When you enter the bustling Town Square, your eyes are drawn to a weather-worn sign that reads "store" <br><br> It beckons you with the promise of powerful swords and essential supplies.<br><br>Will you venture inside and equip yourself for the battles ahead?`
    },
    {
        name: "Store",
        "button text": ["Buy a health potion (10 coin)", "Buy weapon (30 coin)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: `As you step through the creaking door, the scent of leather and steel fills your nostrils. <br> <br> Shelves line the walls, displaying an array of gleaming swords and potions. <br><br>Behind the counter, a grizzled blacksmith looks up, nodding in greeting. Welcome to the store, where heroes are made. <br><br>What will you buy to aid you in your quest?`
    },
    {
        name: "Dungeon",
        "button text": ["Fight slime", "Fight beast", "Go to Town Square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: `As you step into the dimly lit cave, your eyes adjust to the darkness, revealing shadowy figures lurking ahead. Two creatures emerge—a slimy, gelatinous slime and a fierce, snarling beast—blocking your path with no other route in sight. The slime's slow, predictable movements and vulnerable, jelly-like body make it an easier target, while the beast is agile and powerful, with sharp claws and a menacing growl. Consider your options carefully, as your decision will determine the outcome of this encounter. <br>Will you face these monsters in battle?`
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You face a menacing monster, readying yourself for battle."
    }
]

leftButton.onclick = goStore
middleButton.onclick = goDungeon
rightButton.onclick = fightDrakorath

function update(location) {
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

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (coin >= 30) {
            coin -= 30
            currentWeapon++
            coinText.textContent = coin;
            let newWeapon = weapons[currentWeapon].name
            let weaponDamage = weapons[currentWeapon].power
            text.innerHTML = `As you purchase the ${newWeapon}, you feel its weight in your hand, its blade gleaming in the light. <br> With ${weaponDamage} power, it promises to be a formidable weapon against your foes. `
            text.innerHTML += ` <br><br>You add it to your inventory, alongside your trusty ${inventory} <br><br>`
            inventory.push(newWeapon)
            text.innerHTML += `Inventory: ${inventory}`
        } else {
            text.innerHTML = "As you look through the store's offerings, you realize you're short on coins and can't afford to buy anything new. <br><br>You decide to stick with your current gear for now, hoping to earn more coins in the future."
        }
    }
    else {
        text.innerHTML = "As you make your selections, you realize that you've purchased everything the store has to offer. <br><br> Your inventory now includes a variety of powerful weapons and useful items, giving you a significant advantage in your quest. <br><br>With your newfound gear, you feel more prepared than ever to face the challenges ahead."
        middleButton.innerText = "Sell weapon for 15 coin"
        middleButton.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        coin += 15
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
    monsterStats.style.display = "block"
    monsterNameText.textContent = monsters[fighting].name
    monsterHealthText.textContent = monsterHealth
}

function attack() {
    text.innerHTML = `The ${monsters[fighting].name} attacks.`
    text.innerHTML += ` You attack it with your ${weapons[currentWeapon].name}.`
    hp -= monsters[fighting].level
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
    hpText.textContent = hp
    monsterHealthText.innerHTML = monsterHealth

}

function dodge() {

}