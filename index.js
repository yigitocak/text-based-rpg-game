let xp = 0;
let hp = 100;
let coin = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [`stick`];

const xpText = document.getElementById('xp')
const hpText = document.getElementById('hp')
const coinText = document.getElementById('coin')
const leftButton = document.getElementById('button1');
const middleButton = document.getElementById('button2');
const rightButton = document.getElementById('button3');
const text  = document.getElementById('story');
const currentLocation = document.getElementById('location');

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", "Go to cave", "Fight the dragon"]
    }
]

leftButton.onclick = goStore;
middleButton.onclick = goDungeon;
rightButton.onclick = fightDrakorath;

function update(location) {

}

function goTown() {
    currentLocation.textContent = "Town Square"
    leftButton.innerText = "Go to store"
    middleButton.innerText = "Go to dungeon"
    rightButton.innerText = "Fight Drakorath"
    text.innerHTML = "As you enter the bustling Town Square, your eyes are drawn to a weather-worn sign that reads \"store.\" <br><br> It beckons you with the promise of powerful swords and essential supplies.<br><br>Will you venture inside and equip yourself for the battles ahead?";

    leftButton.onclick = goStore;
    middleButton.onclick = goDungeon;
    rightButton.onclick = fightDrakorath;
}

function goStore() {
    currentLocation.textContent = "Store"
    leftButton.innerText = "Buy 10 health (10 coin)"
    middleButton.innerText = "Buy weapon (30 coin)"
    rightButton.innerText = "Go back to Town Square"
    text.innerHTML = "As you step through the creaking door, the scent of leather and steel fills your nostrils. <br> <br> Shelves line the walls, displaying an array of gleaming swords and potions. <br><br>Behind the counter, a grizzled blacksmith looks up, nodding in greeting. Welcome to the store, where heroes are made. <br><br>What will you buy to aid you in your quest?";

    leftButton.onclick = buyHealth;
    middleButton.onclick = buyWeapon;
    rightButton.onclick = goTown;
}

function goDungeon() {

}

function fightDrakorath() {

}

function buyHealth() {
    text.innerHTML = "You carefully select a small vial containing a shimmering red liquid—the renowned health potion. <br><br> With a quick sip, you feel a surge of vitality as your wounds begin to heal. Your health increases by 10 points, fortifying you for the challenges that lie ahead."
}

function buyWeapon() {

}
