// NOTES go into my upgrades and get the quantity number out of each item and assign to a value to then draw to HTML in a different function instead of trying to update my HTML in my buy item button. Have one function that finds my quantity value of each item, and then have another function that draws/updates the number that corresponds to each HTML document

// SECTION Global Variables
let clickCount = 10000
let clickAmount = 1
let autoAmount = 0
let pickElem = ''
let itemElem = 0
let axePrice = 100
let pickPrice = 20
let roverPrice = 600
let hummerPrice = 2000
// SECTION DOC Elements
const clickCountElem = document.getElementById('clickCount')
const pickAmountElem = document.getElementById('pickAmount')
const roverAmountElem = document.getElementById('roverAmount')
const hummerAmountElem = document.getElementById('hummerAmount')
const clickAmountElem = document.getElementById('clickAmount')
const axeAmountElem = document.getElementById('axeAmount')
const autoAmountElem = document.getElementById('autoAmount')
const itemCountElem = document.getElementById('itemCount')
const axePriceElem = document.getElementById('axePrice')
const pickPriceElem = document.getElementById('pickPrice')
const roverPriceElem = document.getElementById('roverPrice')
const hummerPriceElem = document.getElementById('hummerPrice')
const activeUpgradeOne = document.getElementById('activeUpgradeOne')
const activeUpgradeTwo = document.getElementById('activeUpgradeTwo')
const passiveUpgradeOne = document.getElementById('passiveUpgradeOne')
const passiveUpgradeTwo = document.getElementById('passiveUpgradeTwo')
const skinningLevelElem = document.getElementById('skinnningLevel')
const rareSpawnElem = document.getElementById('rareSpawn')
// SECTION OBJECTS
let clickUpgrades = [
  {
    name: 'pickaxe',
    price: 20,
    quantity: 0,
    multiplier: 1
  },
  {
    name: 'axe',
    price: 100,
    quantity: 0,
    multiplier: 6
  }
];
let automaticUpgrades = [
  {
    name: 'rover',
    price: 600,
    quantity: 0,
    multiplier: 20
  },
  {
    name: 'hummer',
    price: 2000,
    quantity: 0,
    multiplier: 100
  }
];
// SECTION Functions
function updateCount() {
  clickCountElem.innerText = clickCount
  clickAmountElem.innerText = clickAmount
  autoAmountElem.innerText = autoAmount
  pickAmountElem.innerText = pickElem
  // itemCountElem.innerText = itemElem
  axePriceElem.innerText = axePrice
  pickPriceElem.innerText = pickPrice
  roverPriceElem.innerText = roverPrice
  hummerPriceElem.innerText = hummerPrice
}
function collectAutoUpgrades() {
  automaticUpgrades.forEach(upgrade => {
    let upgradeAmount = upgrade.quantity * upgrade.multiplier
    clickCount += upgradeAmount
    clickCountElem.innerText = clickCount
  });
}
function mine() {
  clickCount++
  clickUpgrades.forEach(upgrade => {
    let upgradeClick = upgrade.quantity * upgrade.multiplier
    clickCount += upgradeClick
  });
  console.log('clickCount', clickCount)
  console.log('clickAmount', clickAmount)
  updateCount()
}
// Skinning Knife
function buyAxe() {
  let axe = clickUpgrades[1]
  if (clickCount >= axe.price) {
    clickCount -= clickUpgrades[1].price
    axe.quantity++
    clickAmount += axe.multiplier
    clickUpgrades[1].price *= 2
    // clickQuantity = axe.quantity * axe.multiplier
    // clickTotal = clickQuantity + clickAmount
    // clickAmount = clickTotal
    axePrice = clickUpgrades[1].price
    axeAmountElem.innerText = axe.quantity
    updateCount()
  }
  else { alert('not enough click') }
}
// Skinning ++
function buyPick(itemName) {
  let pickAxeItem = clickUpgrades.find(upgrade => upgrade.name == itemName)
  // Checks to see if you have enough clicks
  if (clickCount >= pickAxeItem.price) {
    // Takes away the cost of item
    clickCount -= pickAxeItem.price
    // Increases your quantity of item
    pickAxeItem.quantity++
    pickAxeItem.price *= 2
    // update HTML to reflect change in pickaxe quantity
    pickElem = pickAxeItem.quantity
    pickPrice = pickAxeItem.price
    // apply upgrades to click
    // let upgradeClick = pickAxeItem.quantity * pickAxeItem.multiplier
    clickAmount += pickAxeItem.multiplier

    skinningLevelElem.innerHTML = `<div class="chat-one" id=""></div>`


    if (pickAxeItem.quantity >= 2) {
      skinningLevelElem.innerHTML = `
      <div class="chat-two" id="">
      </div>
      `
    }

    // console.log(upgrade)
    updateCount()
  }
  else { alert('not enough clicks') }
};
function buyItem(itemName) {
  let singleItem = clickUpgrades.find(upgrade => upgrade.name == itemName)
  console.log(singleItem);
  // If i want to use this function need to add price increase to items
  if (clickCount >= singleItem.price) {
    clickCount -= singleItem.price
    singleItem.quantity++
    clickAmount += singleItem.multiplier
    // UPDATE ALL HTML
    itemElem = singleItem.quantity

    console.log(clickAmount)
    updateCount()
  }
}
// Map
function buyRover(itemName) {
  let autoUpgrade = automaticUpgrades.find(upgrade => upgrade.name == itemName)
  if (clickCount >= autoUpgrade.price) {
    clickCount -= autoUpgrade.price
    autoUpgrade.quantity++
    autoAmount += autoUpgrade.multiplier
    autoUpgrade.price *= 2
    roverPrice = autoUpgrade.price
    roverAmountElem.innerText = autoUpgrade.quantity
    passiveUpgradeOne.innerHTML = `
    <img class = 'map-image'
    src=""
    alt="">
    `

    updateCount()
  }
  else { alert('not enough clicks') }
}
// Moonkin
function buyHummer(itemName) {
  let autoUpgrade = automaticUpgrades.find(upgrade => upgrade.name == itemName)
  if (clickCount >= autoUpgrade.price) {
    clickCount -= autoUpgrade.price
    autoUpgrade.quantity++
    autoAmount += autoUpgrade.multiplier
    autoUpgrade.price *= 2
    hummerPrice = autoUpgrade.price
    hummerAmountElem.innerText = autoUpgrade.quantity
    passiveUpgradeTwo.innerHTML = `
    <img
    class = 'upgrade-border'
    src="https://media0.giphy.com/media/QJJLEztnLYmAfIkCUI/200w.webp?cid=ecf05e47w0nt0r818dox6gpnd6s8uwew0t3sq4jylbf7jx48&ep=v1_gifs_search&rid=200w.webp&ct=g"
    alt="Moonkin">
    `

    updateCount()
  }
  else { alert('not enough clicks') }
}
// SECTION RANDOM STUFF

function hideImage() {
  const img = document.getElementById('bonus-image');
  const canvas = document.getElementById('canvas');

  if (img.style.display === 'none') {
    // update alert box
    rareSpawnElem.innerText = 'RARE SPAWN!!'
    // hide / unhide image
    img.style.display = 'block';
    img.style.position = 'absolute';
    // get dimension of img
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    // get dimensions of canvas
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    // generate number for random spot
    const randomX = Math.floor(Math.random() * (canvasWidth - imgWidth));
    const randomY = Math.floor(Math.random() * (canvasHeight - imgHeight));
    // draw to random spot
    img.style.left = randomX + 'px'
    img.style.top = randomY + 'px'
  } else {
    img.style.display = 'none'
    rareSpawnElem.innerText = '! !'
  }
  console.log('bonus')
}
function bonus() {
  clickCount += 10
  clickUpgrades.forEach(upgrade => {
    let upgradeClick = upgrade.quantity * upgrade.multiplier
    clickCount += upgradeClick
  });
  console.log('clickCount', clickCount)
  console.log('clickAmount', clickAmount)
  updateCount()
}




// ON PAGE LOAD
setInterval(collectAutoUpgrades, 3000);
updateCount();
hideImage();

setInterval(hideImage, 10000);
setInterval(hideImage, 11000);