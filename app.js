// SECTION Global Variables
// Current Leather
let clickCount = 0
// Leather Per Click
let clickAmount = 1
// Passive Leather
let autoAmount = 0
let pickElem = ''
let itemElem = 0
// Skinning Knife
let axePrice = 100
// Skinning Skill +
let pickPrice = 20
// Map/Compass
let roverPrice = 250
// Boomkin
let hummerPrice = 1000
let leatherGained = 0
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
const leatherGainedElem = document.getElementById('leatherGained')
const buttonSkinElem = document.getElementById('skinSkill')
const achievementElem = document.getElementById('achievements')
const achievementTwoElem = document.getElementById('achievementsTwo')
const compassElem = document.getElementById('compass')
const drawCompassElem = document.getElementById('drawCompass')
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
    price: 250,
    quantity: 0,
    multiplier: 20
  },
  {
    name: 'hummer',
    price: 1000,
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
  leatherGainedElem.innerText = leatherGained
}
function collectAutoUpgrades() {
  automaticUpgrades.forEach(upgrade => {
    let upgradeAmount = upgrade.quantity * upgrade.multiplier
    clickCount += upgradeAmount
    leatherGained += upgradeAmount
    clickCountElem.innerText = clickCount
    leatherGainedElem.innerText = leatherGained
  });
  updateCount();
  mileStone();
  buttonChecker();
}
function mine() {
  leatherGained++
  clickCount++
  clickUpgrades.forEach(upgrade => {
    let upgradeClick = upgrade.quantity * upgrade.multiplier
    clickCount += upgradeClick
    leatherGained += upgradeClick
  });
  console.log('clickCount', clickCount)
  console.log('clickAmount', clickAmount)
  mileStone();
  buttonChecker();
  updateCount();
}
// BUY SKINNING KNIF
function buyAxe() {
  let axe = clickUpgrades[1]
  if (clickCount >= axe.price) {
    clickCount -= clickUpgrades[1].price
    axe.quantity++
    clickAmount += axe.multiplier
    clickUpgrades[1].price += 100
    // clickQuantity = axe.quantity * axe.multiplier
    // clickTotal = clickQuantity + clickAmount
    // clickAmount = clickTotal
    axePrice = clickUpgrades[1].price
    axeAmountElem.innerText = axe.quantity
    activeUpgradeOne.innerHTML += `<i class="mdi mdi-knife text-danger fs-2"></i>`
    buttonChecker();
    updateCount();
  }
  else { alert('not enough click') }
}
// BUY SKINNING ++
function buyPick(itemName) {
  let pickAxeItem = clickUpgrades.find(upgrade => upgrade.name == itemName)
  // Checks to see if you have enough clicks
  if (clickCount >= pickAxeItem.price) {
    // Takes away the cost of item
    clickCount -= pickAxeItem.price
    // Increases your quantity of item
    pickAxeItem.quantity++
    pickAxeItem.price += 20
    // update HTML to reflect change in pickaxe quantity
    pickElem = pickAxeItem.quantity
    pickPrice = pickAxeItem.price
    // apply upgrades to click
    // let upgradeClick = pickAxeItem.quantity * pickAxeItem.multiplier
    clickAmount += pickAxeItem.multiplier


    skinningLevelElem.innerHTML = `<div class="chat-one" id=""></div>`


    if (pickAxeItem.quantity % 2 == 0) {
      skinningLevelElem.innerHTML = `
      <div class="chat-two" id="">
      </div>
      `
    }
    if (pickAxeItem.quantity % 2 == 1) {
      skinningLevelElem.innerHTML = `<div class="chat-one" id=""></div>`
    }

    buttonChecker();
    updateCount();
  }
  else { alert('not enough clicks') }
};
// UNUSED FUNCTION (Tried to make one buy function but moved onto styling and stretch goals -_- )
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
    // NOTES / go into my upgrades and get the quantity number out of each item and assign to a value to then draw to HTML in a DIFFERENT function instead of trying to update my HTML in my buy item button. Have ONE function that finds my QUANTITY VALUE of each item, and then have ANOTHER function that DRAWS/UPDATES the number that corresponds to EACH HTML document

    buttonChecker();
    updateCount();
  }
}
// BUY MAP & COMPASS
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
    <div class = "map-image"> </>
    `
    if (autoUpgrade.quantity >= 1) {
      compassElem.innerText = 'Buy Compass x'
    }
    if (autoUpgrade.quantity > 1) {
      drawCompassElem.innerHTML += `<i class="mdi mdi-compass fs-2"></i>`
    }
    buttonChecker();
    updateCount();
  }
  else { alert('not enough clicks') }
}
// BUY MOONKIN
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
    if (autoUpgrade.quantity >= 2) {
      activeUpgradeTwo.innerHTML = `
      <img
      class = 'upgrade-border'
      src="https://media1.giphy.com/media/2UpMjkgq1lZdVVnTAv/giphy.gif?cid=ecf05e47tqjj966yl5viuiwlkwzt64ix04556mwadmyvjmkt&ep=v1_gifs_search&rid=giphy.gif&ct=g"
      alt="Moonkin">
      `
    }
    buttonChecker();
    updateCount();
  }
  else { alert('not enough clicks') }
}
// SECTION RANDOM STUFF
// ACHIEVEMENTS
function mileStone() {


  if (leatherGained >= 10) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - Slow N Steady 🎉'
    // achievementElem.innerText = '🎉 Slow N Steady - 10 LEATHER EARNED 🎉'
    achievementTwoElem.innerText = '🐢 Slow N Steady - 10 LEATHER EARNED 🐢'
  }
  if (leatherGained >= 50) {
    rareSpawnElem.innerText = `🎉 ACHIEVEMENT UNLOCKED - Heatin' up! 🎉`
    achievementElem.innerText = `🐢 Slow N Steady - 10 LEATHER EARNED 🐢`
    achievementTwoElem.innerText = `🔥 Heatin' up! 100 LEATHER EARNED 🔥`
  }
  if (leatherGained >= 100) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - LET HIM COOK! 🎉'
    achievementElem.innerText = `🔥 Heatin' up! 100 LEATHER EARNED 🔥`
    achievementTwoElem.innerText = '🍳 LET HIM COOK! 1000 LEATHER EARNED 🍳'
  }
  if (leatherGained >= 1000) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - YOU ANIMAL🎉'
    achievementElem.innerText = '🍳 LET HIM COOK! 1000 LEATHER EARNED 🍳'
    achievementTwoElem.innerText = '🐕‍🦺 YOU ANIMAL - 2000 LEATHER EARNED 🐕‍🦺'
  }
  if (leatherGained >= 2000) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - YOU ANIMAL🎉'
    achievementElem.innerText = '🐕‍🦺 YOU ANIMAL - 2000 LEATHER EARNED 🐕‍🦺'
    achievementTwoElem.innerText = '🏠 GO HOME - 2000 LEATHER EARNED 🏠'
  }
  if (leatherGained >= 3000) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - YOU ANIMAL🎉'
    achievementElem.innerText = '🏠 GO HOME - 2000 LEATHER EARNED 🏠'
    achievementTwoElem.innerText = '👶 THINK OF THE CHILDREN! - 2000 LEATHER EARNED 🐣'
  }
  if (leatherGained >= 9000) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - ITS OVER 9000!!!!🎉'
    achievementElem.innerText = '👶 THINK OF THE CHILDREN! - 2000 LEATHER EARNED 🐣'
    achievementTwoElem.innerText = '🐱‍👤🐱‍👤ITS OVER 9000!!!!🐱‍👤🐱‍👤'
  }
  if (leatherGained >= 10000) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - Close Your Web Browser🎉'
    achievementElem.innerText = '🐱‍👤🐱‍👤ITS OVER 9000!!!!🐱‍👤🐱‍👤'
    achievementTwoElem.innerText = '⚡⚡ Close Your Web Browser ⚡⚡'
  }
  if (leatherGained >= 100000) {
    rareSpawnElem.innerText = '🎉 ACHIEVEMENT UNLOCKED - Seriously Your Wasting Power >:C🎉'
    achievementElem.innerText = '⚡⚡ Close Your Web Browser ⚡⚡'
    achievementTwoElem.innerText = '😡😡 Seriously Your Wasting Power >:C 😡😡'
  }
  if (leatherGained >= 1000000) {
    rareSpawnElem.innerText = `🎉 ACHIEVEMENT UNLOCKED - You're Still Here? 🎉`
    achievementElem.innerText = '😡😡 Seriously Your Wasting Power >:C 😡😡'
    achievementTwoElem.innerText = `❓❔❓ You're Still Here?❓❔❓ `
  }
}
// DISABLE BUTTONS IF NOT ENOUGH LEATHER
function buttonChecker() {
  if (clickCount < clickUpgrades[0].price) {
    document.getElementById('skinSkill').disabled = true
  }
  else {
    document.getElementById('skinSkill').disabled = false
  }

  if (clickCount < clickUpgrades[1].price) {
    document.getElementById('knifeSkill').disabled = true
  }
  else {
    document.getElementById('knifeSkill').disabled = false
  }
  if (clickCount < automaticUpgrades[0].price) {
    document.getElementById('mapSkill').disabled = true
  }
  else {
    document.getElementById('mapSkill').disabled = false
  }
  if (clickCount < automaticUpgrades[1].price) {
    document.getElementById('boomkinSkill').disabled = true
  }
  else {
    document.getElementById('boomkinSkill').disabled = false
  }
}
// HIDE / UNHIDE BONUS IMAGE
function hideImage() {
  const img = document.getElementById('bonus-image');
  const canvas = document.getElementById('canvas');

  if (img.style.display === 'none') {
    // update alert box
    rareSpawnElem.innerText = '⚠🔪⚠ RARE SPAWN ⚠🔪⚠'
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
    // rareSpawnElem.innerText = '! !'
  }
  console.log('bonus')
}
// BONUS LEATHER GAINED FROM RARE
function bonus() {
  clickCount += 10
  leatherGained += 10
  clickUpgrades.forEach(upgrade => {
    let upgradeClick = upgrade.quantity * upgrade.multiplier
    clickCount += upgradeClick
    leatherGained += upgradeClick
  });
  console.log('clickCount', clickCount)
  console.log('clickAmount', clickAmount)
  updateCount()
}
// SAVE
function saveGame() {
  let confirmed = confirm('Are you Sure? Will OverWrite Current Saved Game.');
  if (confirmed) {
    localStorage.setItem('clickCount', clickCount)
    localStorage.setItem('clickAmount', clickAmount)
    localStorage.setItem('autoAmount', autoAmount)
    localStorage.setItem('pickElem', pickElem)
    localStorage.setItem('itemElem', itemElem)
    localStorage.setItem('axePrice', axePrice)
    localStorage.setItem('pickPrice', pickPrice)
    localStorage.setItem('roverPrice', roverPrice)
    localStorage.setItem('hummerPrice', hummerPrice)
    localStorage.setItem('leatherGained', leatherGained)
    updateCount();
    console.log('game saved');
  }
  else {
    console.log('save cancelled')
  }
}
// LOAD
function loadGame() {
  clickCount = parseInt(localStorage.getItem('clickCount', clickCount))
  // clickAmount = parseInt(localStorage.getItem('clickAmount', clickAmount))
  // autoAmount = parseInt(localStorage.getItem('autoAmount', autoAmount))
  // pickElem = parseInt(localStorage.getItem('pickElem', pickElem))
  // itemElem = parseInt(localStorage.getItem('itemElem', itemElem))
  // axePrice = parseInt(localStorage.getItem('axePrice', axePrice))
  // pickPrice = parseInt(localStorage.getItem('pickPrice', pickPrice))
  // roverPrice = parseInt(localStorage.getItem('roverPrice', roverPrice))
  // hummerPrice = parseInt(localStorage.getItem('hummerPrice', hummerPrice))
  leatherGained = parseInt(localStorage.getItem('leatherGained', leatherGained))

  updateCount();
  console.log('game loaded');
}
// RESET
function resetGame() {
  let confirmed = confirm('Are you Sure? Will Reset Current Scores');
  if (confirmed) {
    clickCount = 0
    clickAmount = 1
    autoAmount = 0
    pickElem = ''
    itemElem = 0
    axePrice = 100
    pickPrice = 20
    roverPrice = 250
    hummerPrice = 1000
    leatherGained = 0
    updateCount();
    console.log('game reset')
  }
}
// ON PAGE LOAD
setInterval(collectAutoUpgrades, 3000);
updateCount();
hideImage();
buttonChecker();
setInterval(hideImage, 10000);
setInterval(hideImage, 11000);