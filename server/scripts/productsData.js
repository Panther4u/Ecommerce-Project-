const { getDiscountedPrice, formatNumber } = require('./helpers');
const { v4: uuid } = require('uuid');
const path = require('path');
const productsData = [
  {
    shortName: "PS Gamepad",
    name: "PS5 Gamepad",
    category: "gaming",
    price: 69.99,
    discount: 40,
    description: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    addedDate: "2024/2/2",
    img: 'Public/Assets/Products/ps5-gamepad/ps5-gamepad.webp',
    otherImages: [
      'Public/Assets/Products/ps5-gamepad/ps5-gamepad.webp',
      'Public/Assets/Products/ps5-gamepad/ps5-gamepad-thum1.webp',
      'Public/Assets/Products/ps5-gamepad/ps5-gamepad-thum2.webp',
      'Public/Assets/Products/ps5-gamepad/ps5-gamepad-thum3.webp'
    ],
    colors: [
      { name: "ice blue", color: "#dcdfea" },
      { name: "black", color: "#27292d" }
    ],
    rate: 5,
    votes: 88,
    quantity: 1,
    sold: 105,
    id: uuid()
  },
  {
    shortName: "AK-9000 Keyboard",
    name: "AK-900 Wired Keyboard",
    category: "gaming",
    price: 8.66,
    discount: 35,
    description: "Elevate your gaming experience with the AK-900 Wired Keyboard. Designed for precision and durability, this keyboard boasts high responsiveness and tactile feedback. Its sleek design and customizable RGB lighting make it a stylish addition to any gaming setup. Whether you're gaming competitively or typing up reports, the AK-900 ensures peak performance with every keystroke.",
    addedDate: "2024/2/7",
    img: 'Public/Assets/Products/wired-keyboard/wired-keyboard.webp',
    otherImages: [
      'Public/Assets/Products/wired-keyboard/wired-keyboard.webp',
      'Public/Assets/Products/wired-keyboard/wired-keyboard-thum1.webp',
      'Public/Assets/Products/wired-keyboard/wired-keyboard-thum2.webp',
      'Public/Assets/Products/wired-keyboard/wired-keyboard-thum3.webp'
    ],
    colors: [
      { name: "white", color: "#e4e4e4" },
      { name: "black", color: "#03040f" }
    ],
    rate: 4,
    votes: 75,
    quantity: 1,
    sold: 210,
    id: uuid()
  },
  {
    shortName: "IPS LCD Monitor",
    name: "IPS LCD Gaming Monitor",
    category: "gaming",
    price: 244.8,
    discount: 30,
    description: "Immerse yourself in the world of gaming with the IPS LCD Gaming Monitor. Featuring stunning visuals and ultra-smooth gameplay, this monitor delivers an unparalleled gaming experience. With its high refresh rate and low input lag, you'll never miss a frame. Whether you're battling foes or exploring vast worlds, the IPS LCD Gaming Monitor brings every detail to life with vibrant colors and crisp clarity.",
    addedDate: "2024/3/15",
    img: 'Public/Assets/Products/gaming-monitor/gaming-monitor.webp',
    otherImages: [
      'Public/Assets/Products/gaming-monitor/gaming-monitor.webp',
      'Public/Assets/Products/gaming-monitor/gaming-monitor-thum1.webp',
      'Public/Assets/Products/gaming-monitor/gaming-monitor-thum2.webp',
      'Public/Assets/Products/gaming-monitor/gaming-monitor-thum3.webp'
    ],
    colors: [
      { name: "black", color: "#151515" }
    ],
    rate: 5,
    votes: 99,
    quantity: 1,
    sold: 463,
    id: uuid()
  },
  {
    shortName: "S-Series Chair",
    name: "S-Series Comfort Chair",
    category: "furniture",
    price: 39.99,
    discount: 25,
    description: "Experience comfort like never before with the S-Series Comfort Chair. Crafted with plush padding and ergonomic design, this chair provides exceptional support during long gaming sessions or work hours. Its sleek and modern aesthetic adds a touch of sophistication to any space. Say goodbye to discomfort and hello to relaxation with the S-Series Comfort Chair.",
    addedDate: "2024/1/1",
    img: 'Public/Assets/Products/comfort-chair/comfort-chair.webp',
    otherImages: [
      'Public/Assets/Products/comfort-chair/comfort-chair.webp',
      'Public/Assets/Products/comfort-chair/comfort-chair-thum1.webp',
      'Public/Assets/Products/comfort-chair/comfort-chair-thum2.webp',
      'Public/Assets/Products/comfort-chair/comfort-chair-thum3.webp'
    ],
    colors: [
      { name: "ice blue", color: "#d3d7dc" },
      { name: "gray", color: "#858080" },
      { name: "brown", color: "#433636" },
      { name: "custom", color: "#b4a9a8" }
    ],
    rate: 4.5,
    votes: 99,
    quantity: 1,
    sold: 211,
    id: uuid()
  },
  {
    shortName: "The North Coat",
    name: "The North Coat",
    category: "clothes",
    price: 89.99,
    discount: 40,
    description: "Stay warm and stylish with The North Coat. Made from premium materials and expert craftsmanship, this coat is designed to withstand the elements while keeping you cozy. Its timeless design and versatile color make it a wardrobe essential for any season. Whether you're braving the outdoors or running errands in the city, The North Coat is sure to turn heads wherever you go.",
    addedDate: "2024/3/7",
    img: 'Public/Assets/Products/north-coat/north-coat.webp',
    otherImages: [
      'Public/Assets/Products/north-coat/north-coat.webp',
      'Public/Assets/Products/north-coat/north-coat-thum1.webp',
      'Public/Assets/Products/north-coat/north-coat-thum2.webp',
      'Public/Assets/Products/north-coat/north-coat-thum3.webp'
    ],
    colors: [
      { name: "pink", color: "#fa6a96" },
      { name: "light pink", color: "#ffb0ab" },
      { name: "dark blue", color: "#29518a" }
    ],
    rate: 5,
    votes: 65,
    quantity: 1,
    sold: 1405,
    id: uuid()
  },
  {
    shortName: "Gucci Duffle Bag",
    name: "Gucci Duffle Bag",
    category: "backpack",
    price: 2980,
    discount: 10,
    description: "Make a statement with the Gucci Duffle Bag. Crafted from luxurious materials and adorned with iconic branding, this bag exudes sophistication and style. With its spacious interior and multiple compartments, it's perfect for storing all your essentials in organized fashion. Whether you're traveling in first-class or hitting the gym, the Gucci Duffle Bag is the epitome of luxury and functionality.",
    addedDate: "2022/9/15",
    img: 'Public/Assets/Products/gucci-duffle-bag/gucci-duffle-bag.webp',
    otherImages: [
      'Public/Assets/Products/gucci-duffle-bag/gucci-duffle-bag.webp',
      'Public/Assets/Products/gucci-duffle-bag/gucci-duffle-bag-thum2.webp',
      'Public/Assets/Products/gucci-duffle-bag/gucci-duffle-bag-thum3.webp',
      'Public/Assets/Products/gucci-duffle-bag/gucci-duffle-bag-thum4.webp'
    ],
    colors: [
      { name: "Tan", color: "#ae9c89" },
      { name: "light grayish", color: "#c1bab1" },
      { name: "brown", color: "#987553" }
    ],
    rate: 3.5,
    votes: 159,
    quantity: 1,
    sold: 1533,
    id: uuid()
  },
  {
    shortName: "RGB Liquid CPU Cooler",
    name: "RGB Liquid CPU Cooler",
    category: "gaming",
    price: 139,
    discount: 30,
    description: "Keep your CPU cool and your system running smoothly with the RGB Liquid CPU Cooler. Featuring a sleek design and customizable RGB lighting, this cooler not only enhances your PC's performance but also adds a touch of style to your gaming setup. With its efficient cooling technology and quiet operation, you can overclock with confidence and push your rig to the limit. Elevate your gaming experience with the RGB Liquid CPU Cooler.",
    addedDate: "2024/4/20",
    img: 'Public/Assets/Products/rgb-cpu-cooler/rgb-cpu-cooler.webp',
    otherImages: [
      'Public/Assets/Products/rgb-cpu-cooler/rgb-cpu-cooler.webp',
      'Public/Assets/Products/rgb-cpu-cooler/rgb-cpu-cooler-thum1.webp',
      'Public/Assets/Products/rgb-cpu-cooler/rgb-cpu-cooler-thum2.webp',
      'Public/Assets/Products/rgb-cpu-cooler/rgb-cpu-cooler-thum3.webp'
    ],
    colors: [
      { name: "black", color: "#0d0d0d" }
    ],
    rate: 4.5,
    votes: 124,
    quantity: 1,
    sold: 789,
    id: uuid()
  },
  {
    shortName: "Smart Thermostat",
    name: "Smart Thermostat",
    category: "smart-home",
    price: 199.99,
    discount: 15,
    description: "Take control of your home's climate with the Smart Thermostat. Compatible with most HVAC systems, this thermostat allows you to adjust temperatures remotely from your smartphone or tablet. Its intuitive interface and energy-saving features help reduce utility bills without sacrificing comfort. Whether you're at home or on the go, the Smart Thermostat ensures your space is always at the perfect temperature.",
    addedDate: "2024/5/10",
    img: 'Public/Assets/Products/smart-thermostat/smart-thermostat.webp',
    otherImages: [
      'Public/Assets/Products/smart-thermostat/smart-thermostat.webp',
      'Public/Assets/Products/smart-thermostat/smart-thermostat-thum1.webp',
      'Public/Assets/Products/smart-thermostat/smart-thermostat-thum2.webp',
      'Public/Assets/Products/smart-thermostat/smart-thermostat-thum3.webp'
    ],
    colors: [
      { name: "white", color: "#ffffff" }
    ],
    rate: 4,
    votes: 88,
    quantity: 1,
    sold: 310,
    id: uuid()
  },
  {
    shortName: "Wireless Earbuds",
    name: "Wireless Earbuds",
    category: "electronics",
    price: 99.99,
    discount: 20,
    description: "Enjoy wireless freedom with the Wireless Earbuds. Featuring advanced Bluetooth technology and noise-cancelling capabilities, these earbuds deliver crystal-clear audio without the hassle of wires. With ergonomic design and long-lasting battery life, they're perfect for workouts, commuting, or simply relaxing at home. Elevate your listening experience with the Wireless Earbuds.",
    addedDate: "2024/6/5",
    img: 'Public/Assets/Products/wireless-earbuds/wireless-earbuds.webp',
    otherImages: [
      'Public/Assets/Products/wireless-earbuds/wireless-earbuds.webp',
      'Public/Assets/Products/wireless-earbuds/wireless-earbuds-thum1.webp',
      'Public/Assets/Products/wireless-earbuds/wireless-earbuds-thum2.webp',
      'Public/Assets/Products/wireless-earbuds/wireless-earbuds-thum3.webp'
    ],
    colors: [
      { name: "black", color: "#000000" },
      { name: "white", color: "#ffffff" },
      { name: "red", color: "#ff0000" }
    ],
    rate: 4.5,
    votes: 112,
    quantity: 1,
    sold: 1567,
    id: uuid()
  },
  {
    shortName: "Desk Lamp",
    name: "Desk Lamp",
    category: "home-decor",
    price: 29.99,
    discount: 20,
    description: "Illuminate your workspace with the Desk Lamp. Featuring adjustable brightness levels and a sleek modern design, this lamp provides optimal lighting for reading, studying, or working on projects. Its compact size and flexible neck make it easy to position wherever you need extra light. Enhance your productivity and create a stylish ambiance with the Desk Lamp.",
    addedDate: "2024/7/1",
    img: 'Public/Assets/Products/desk-lamp/desk-lamp.webp',
    otherImages: [
      'Public/Assets/Products/desk-lamp/desk-lamp.webp',
      'Public/Assets/Products/desk-lamp/desk-lamp-thum1.webp',
      'Public/Assets/Products/desk-lamp/desk-lamp-thum2.webp',
      'Public/Assets/Products/desk-lamp/desk-lamp-thum3.webp'
    ],
    colors: [
      { name: "white", color: "#ffffff" },
      { name: "black", color: "#000000" },
      { name: "silver", color: "#c0c0c0" }
    ],
    rate: 4,
    votes: 55,
    quantity: 1,
    sold: 987,
    id: uuid()
  },
  {
    shortName: "Portable Power Bank",
    name: "Portable Power Bank",
    category: "electronics",
    price: 39.99,
    discount: 25,
    description: "Stay charged on the go with the Portable Power Bank. Featuring a compact design and high-capacity battery, this power bank provides multiple charges for your devices. With fast charging technology and built-in safety features, it's perfect for travel, outdoor activities, or emergencies. Keep your devices powered and stay connected with the Portable Power Bank.",
    addedDate: "2024/8/15",
    img: 'Public/Assets/Products/power-bank/power-bank.webp',
    otherImages: [
      'Public/Assets/Products/power-bank/power-bank.webp',
      'Public/Assets/Products/power-bank/power-bank-thum1.webp',
      'Public/Assets/Products/power-bank/power-bank-thum2.webp',
      'Public/Assets/Products/power-bank/power-bank-thum3.webp'
    ],
    colors: [
      { name: "black", color: "#000000" },
      { name: "blue", color: "#0000ff" },
      { name: "red", color: "#ff0000" }
    ],
    rate: 4.5,
    votes: 123,
    quantity: 1,
    sold: 1245,
    id: uuid()
  },
  {
    shortName: "Smart Security Camera",
    name: "Smart Security Camera",
    category: "smart-home",
    price: 149.99,
    discount: 20,
    description: "Protect your home with the Smart Security Camera. Featuring advanced motion detection and night vision technology, this camera keeps watch over your property day and night. With two-way audio and remote viewing capabilities, you can monitor your home from anywhere using your smartphone. Whether you're at work or on vacation, the Smart Security Camera provides peace of mind knowing your home is secure.",
    addedDate: "2024/9/20",
    img: 'Public/Assets/Products/security-camera/security-camera.webp',
    otherImages: [
      'Public/Assets/Products/security-camera/security-camera.webp',
      'Public/Assets/Products/security-camera/security-camera-thum1.webp',
      'Public/Assets/Products/security-camera/security-camera-thum2.webp',
      'Public/Assets/Products/security-camera/security-camera-thum3.webp'
    ],
    colors: [
      { name: "white", color: "#ffffff" },
      { name: "black", color: "#000000" }
    ],
    rate: 4,
    votes: 77,
    quantity: 1,
    sold: 890,
    id: uuid()
  },
  {
    shortName: "Air Purifier",
    name: "Air Purifier",
    category: "home-appliances",
    price: 179.99,
    discount: 15,
    description: "Breathe easier with the Air Purifier. Featuring HEPA filtration and whisper-quiet operation, this purifier removes allergens, dust, and odors from your home. With smart sensors and auto mode, it adjusts settings based on air quality for optimal purification. Whether you suffer from allergies or simply want cleaner air, the Air Purifier creates a healthier environment for you and your family.",
    addedDate: "2024/10/5",
    img: 'Public/Assets/Products/air-purifier/air-purifier.webp',
    otherImages: [
      'Public/Assets/Products/air-purifier/air-purifier.webp',
      'Public/Assets/Products/air-purifier/air-purifier-thum1.webp',
      'Public/Assets/Products/air-purifier/air-purifier-thum2.webp',
      'Public/Assets/Products/air-purifier/air-purifier-thum3.webp'
    ],
    colors: [
      { name: "white", color: "#ffffff" },
      { name: "black", color: "#000000" }
    ],
    rate: 4.5,
    votes: 88,
    quantity: 1,
    sold: 435,
    id: uuid()
  },
  {
    shortName: "Smart Door Lock",
    name: "Smart Door Lock",
    category: "smart-home",
    price: 249.99,
    discount: 10,
    description: "Enhance your home security with the Smart Door Lock. Featuring keyless entry and remote access, this lock allows you to control access to your home from anywhere. With customizable user codes and activity logs, you can monitor who enters and exits your property at all times. Whether you're at home or away, the Smart Door Lock provides peace of mind and convenience.",
    addedDate: "2024/11/12",
    img: 'Public/Assets/Products/smart-door-lock/smart-door-lock.webp',
    otherImages: [
      'Public/Assets/Products/smart-door-lock/smart-door-lock.webp',
      'Public/Assets/Products/smart-door-lock/smart-door-lock-thum1.webp',
      'Public/Assets/Products/smart-door-lock/smart-door-lock-thum2.webp',
      'Public/Assets/Products/smart-door-lock/smart-door-lock-thum3.webp'
    ],
    colors: [
      { name: "black", color: "#000000" },
      { name: "silver", color: "#c0c0c0" }
    ],
    rate: 4,
    votes: 66,
    quantity: 1,
    sold: 567,
    id: uuid()
  },
  {
    shortName: "Portable Bluetooth Speaker",
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 79.99,
    discount: 20,
    description: "Take your music anywhere with the Portable Bluetooth Speaker. Featuring immersive sound and compact design, this speaker delivers powerful audio performance wherever you go. With Bluetooth connectivity and long battery life, it's perfect for parties, outdoor adventures, or relaxing at home. Elevate your listening experience with the Portable Bluetooth Speaker.",
    addedDate: "2024/12/18",
    img: 'Public/Assets/Products/bluetooth-speaker/bluetooth-speaker.webp',
    otherImages: [
      'Public/Assets/Products/bluetooth-speaker/bluetooth-speaker.webp',
      'Public/Assets/Products/bluetooth-speaker/bluetooth-speaker-thum1.webp',
      'Public/Assets/Products/bluetooth-speaker/bluetooth-speaker-thum2.webp',
      'Public/Assets/Products/bluetooth-speaker/bluetooth-speaker-thum3.webp'
    ],
    colors: [
      { name: "black", color: "#000000" },
      { name: "gray", color: "#808080" },
      { name: "red", color: "#ff0000" }
    ],
    rate: 4.5,
    votes: 112,
    quantity: 1,
    sold: 890,
    id: uuid()
  }
];
// Function to set after discount price
function setAfterDiscountKey(product) {
  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const formattedDiscountedPrice = formatNumber(discountedPrice);
  product.afterDiscount = formattedDiscountedPrice;
}

// Function to format the product price
function setFormattedPrice(product) {
  product.price = formatNumber(product.price);
}

// Apply formatting and ID generation to all products
productsData.forEach(product => {
  setAfterDiscountKey(product);
  setFormattedPrice(product);
});


module.exports = productsData;
