// Photo credits. All photos are CC0 / public domain (no attribution legally
// required) but we credit the photographers anyway.
const CREDITS = [
  {
    "key": "nike-sb-janoski",
    "title": "Shoes Sneakers",
    "creator": "Joseph Barrientos",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/shoes-sneakers-BVJ82E1ILO"
  },
  {
    "key": "nike-air-force-1-custom",
    "title": "Red, white, yellow, blue Nike",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/9064642/photo-image-paper-plastic-vintage"
  },
  {
    "key": "nike-black-runner",
    "title": "Footwear Outdoor",
    "creator": "Imani Clovis",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/footwear-outdoor-K8VEP08K07"
  },
  {
    "key": "nike-sb-black",
    "title": "Nike Shoes",
    "creator": "Kaique Rocha",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/nike-shoes-PW9I1ZJIE2"
  },
  {
    "key": "nike-grey-volt",
    "title": "Nike Shoes",
    "creator": "Dan Carlson",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/nike-shoes-0R37EU64ZH"
  },
  {
    "key": "jordan-1-black-toe",
    "title": "Nike, Air Jordans, red white",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/6113240/photo-image-public-domain-free-shoes"
  },
  {
    "key": "jordan-5-fire-red",
    "title": "Footwear Shoe",
    "creator": "Hunter Johnson",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/footwear-shoe-RUFNMXXX2F"
  },
  {
    "key": "adidas-superstar",
    "title": "Adidas White",
    "creator": "Jens Mahnke",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/adidas-white-1UNA2YHNKP"
  },
  {
    "key": "adidas-hamburg",
    "title": "Shoes Footwear",
    "creator": "Joshua Niedermayer",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/shoes-footwear-QX5XLUHAH6"
  },
  {
    "key": "adidas-nmd-grey",
    "title": "Shoe Footwear",
    "creator": "Ayo Ogunseinde",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/shoe-footwear-XLQWI4MA0V"
  },
  {
    "key": "adidas-nmd-white",
    "title": "Sport Sneaker Shoe",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/5917192/sport-sneaker-shoe-free-public-domain-cc0-image"
  },
  {
    "key": "adidas-nmd-black",
    "title": "Adidas Nmd",
    "creator": "Kaique Rocha",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/adidas-nmd-Z33QZ8USZE"
  },
  {
    "key": "adidas-ultraboost-white",
    "title": "Sports Shoes, casual footwear. Location",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/6113225/photo-image-public-domain-person-free"
  },
  {
    "key": "adidas-ultraboost-navy",
    "title": "Adidas sneakers, Jump. Location unknown",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/6113075/photo-image-public-domain-black-person"
  },
  {
    "key": "adidas-yeezy-350",
    "title": "Shoe Footwear",
    "creator": "Daniel Chen",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/shoe-footwear-EB0HSPS7PR"
  },
  {
    "key": "new-balance-574",
    "title": "Shoe Footwear",
    "creator": "Linda Xu",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/shoe-footwear-575XG5HORA"
  },
  {
    "key": "vans-slip-on",
    "title": "Shoe Footwear",
    "creator": "Bert Ferranco",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/shoe-footwear-SDPK7Q4CJP"
  },
  {
    "key": "converse-chuck-high",
    "title": "Converse Shoes",
    "creator": "Camila%20Dam%E1sio",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/converse-shoes-8LNCFCLZ45"
  },
  {
    "key": "converse-chuck-low-red",
    "title": "Free sneakers photo",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/5926268/photo-image-public-domain-fashion-free"
  },
  {
    "key": "dr-martens-1460-yellow",
    "title": "Midwest Trekking",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/3286586/free-photo-image-boot-travel-yellow-shoes"
  },
  {
    "key": "dr-martens-1460-cherry",
    "title": "Red boots, footwear & apparel",
    "creator": "Unknown",
    "license": "CC0 1.0",
    "source": "rawpixel",
    "url": "https://www.rawpixel.com/image/6037749/photo-image-public-domain-person-doctor"
  },
  {
    "key": "welcome-1",
    "title": "People Man",
    "creator": "William Stitt",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/people-man-EG7KI8FXPR"
  },
  {
    "key": "welcome-2",
    "title": "Woman Sneakers",
    "creator": "Burst",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/woman-sneakers-7SOVYEAFVL"
  },
  {
    "key": "welcome-3",
    "title": "Light Trainers",
    "creator": "Burst",
    "license": "CC0 1.0",
    "source": "stocksnap",
    "url": "https://stocksnap.io/photo/light-trainers-4SKXXI0CPV"
  }
];

export default CREDITS;
