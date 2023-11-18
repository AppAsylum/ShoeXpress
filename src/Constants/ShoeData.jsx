
  
const ShoeData = [
    {
      id: '1',
      name: 'Nike',
      prices: [
        { size: 'S', price: '100', currency: '$' },
        { size: 'M', price: '120', currency: '$' },
        { size: 'L', price: '140', currency: '$' },
      ],
      imagelink_square: require('../assets/images/nike/nike1.jpg'),
      imagelink_portrait: require('../assets/images/nike/nike1.jpg'),
      average_rating: 4.8,
      ratings_count: '8,231',
      favourite: false,
      type: 'Shoe',
      index: 0,
      description: 'The Nike Air Force 1 is a classic sneaker known for its timeless design and comfort. It features a durable leather upper and a cushioned sole for all-day wear. Whether you\'re hitting the streets or going out with friends, these shoes will keep you looking stylish and feeling great.'
    },
    {
      id: '2',
      name: 'Adidas',
      prices: [
        { size: 'S', price: '80', currency: '$' },
        { size: 'M', price: '90', currency: '$' },
        { size: 'L', price: '100', currency: '$' },
      ],
      imagelink_square: require('../assets/images/adidas/adidas1.jpg'),
      imagelink_portrait: require('../assets/images/adidas/adidas1.jpg'),
      average_rating: 4.6,
      ratings_count: '6,543',
      favourite: false,
      type: 'Shoe',
      index: 1,
      description: 'The Adidas Superstar is an iconic sneaker that has stood the test of time. Known for its classic shell toe design and leather upper, it\'s a favorite for those who appreciate a timeless look. Whether you\'re on the court or simply walking the streets, these sneakers offer both style and comfort.'
    },
    {
      id: '3',
      name: 'Puma',
      prices: [
        { size: 'S', price: '110', currency: '$' },
        { size: 'M', price: '130', currency: '$' },
        { size: 'L', price: '150', currency: '$' },
      ],
      imagelink_square: require('../assets/images/puma/puma1.jpg'),
      imagelink_portrait: require('../assets/images/puma/puma1.jpg'),
      average_rating: 4.5,
      ratings_count: '5,712',
      favourite: true,
      type: 'Shoe',
      index: 2,
      description: 'The Puma RS-X is a sporty and bold sneaker with a chunky, futuristic design. It offers a mix of comfort and style, making it a great choice for athletic activities and streetwear fashion. With its vibrant colorways and innovative design, you\'ll stand out from the crowd.'
    },
    {
      id: '4',
      name: 'New Balance',
      prices: [
        { size: 'S', price: '175', currency: '$' },
        { size: 'M', price: '190', currency: '$' },
        { size: 'L', price: '205', currency: '$' },
      ],
      imagelink_square: require('../assets/images/balance/balance7.jpg'),
      imagelink_portrait: require('../assets/images/balance/balance7.jpg'),
      average_rating: 4.9,
      ratings_count: '9,324',
      favourite: true,
      type: 'Shoe',
      index: 3,
      description: 'The New Balance 990 is a premium running shoe known for its exceptional comfort and quality. Its ENCAP midsole technology provides superior cushioning and support for long-distance running. This shoe combines performance with a classic design, making it a favorite among serious runners.'
    },
    {
      id: '5',
      name: 'Nike',
      prices: [
        { size: 'S', price: '150', currency: '$' },
        { size: 'M', price: '160', currency: '$' },
        { size: 'L', price: '170', currency: '$' },
      ],
      imagelink_square: require('../assets/images/nike/nike13.jpg'),
      imagelink_portrait: require('../assets/images/nike/nike13.jpg'),
      average_rating: 4.6,
      ratings_count: '8,219',
      favourite: true,
      type: 'Shoe',
      index: 4,
      description: 'The Nike Air Max 270 is a stylish and comfortable athletic shoe that offers exceptional cushioning. It\'s perfect for running, training, or everyday wear. With its large Air Max unit in the heel, this shoe provides excellent impact absorption, and its modern design adds a touch of urban flair to your outfit.'
    },
    {
      id: '6',
      name: 'New Balance',
      prices: [
        { size: 'S', price: '80', currency: '$' },
        { size: 'M', price: '90', currency: '$' },
        { size: 'L', price: '100', currency: '$' },
      ],
      imagelink_square: require('../assets/images/balance/balance1.jpg'),
      imagelink_portrait: require('../assets/images/balance/balance1.jpg'),
      average_rating: 4.8,
      ratings_count: '6,543',
      favourite: true,
      type: 'Shoe',
      index: 5,
      description: 'The Adidas Stan Smith is a timeless classic in the world of casual sneakers. Its clean and minimalist design makes it a versatile choice for any casual occasion. The shoe features a leather upper and the iconic Stan Smith logo on the tongue, making it a symbol of simplicity and style.'
    },
    {
      id: '7',
      name: 'Vans',
      prices: [
        { size: 'S', price: '140', currency: '$' },
        { size: 'M', price: '150', currency: '$' },
        { size: 'L', price: '160', currency: '$' },
      ],
      imagelink_square: require('../assets/images/vans/vans6.jpg'),
      imagelink_portrait: require('../assets/images/vans/vans6.jpg'),
      average_rating: 4.7,
      ratings_count: '4,127',
      favourite: false,
      type: 'Shoe',
      index: 6,
      description: 'The Brooks Ghost 14 is a top choice for runners seeking a balance between comfort and performance. It offers a plush cushioning system and a smooth ride, making it ideal for long training sessions or marathons. Its breathable mesh upper ensures your feet stay cool and comfortable during your runs.'
    },
    {
      id: '8',
      name: 'Vans',
      prices: [
        { size: 'S', price: '130', currency: '$' },
        { size: 'M', price: '140', currency: '$' },
        { size: 'L', price: '150', currency: '$' },
      ],
      imagelink_square: require('../assets/images/vans/vans5.jpg'),
      imagelink_portrait: require('../assets/images/vans/vans5.jpg'),
      average_rating: 4.9,
      ratings_count: '5,239',
      favourite: false,
      type: 'Shoe',
      index: 7,
      description: 'The Salomon Speedcross 5 is designed for the trail runner who demands grip, stability, and protection. Its aggressive lug pattern provides superior traction on various terrains, and the Quicklace system ensures a secure fit. With a lightweight yet durable construction, this shoe is perfect for your off-road adventures.'
    },
    {
      id: '9',
      name: 'Dr. Martens 1460',
      prices: [
        { size: 'S', price: '150', currency: '$' },
        { size: 'M', price: '160', currency: '$' },
        { size: 'L', price: '170', currency: '$' },
      ],
      imagelink_square: require('../assets/images/nike/nike13.jpg'),
      imagelink_portrait: require('../assets/images/nike/nike13.jpg'),
      average_rating: 4.6,
      ratings_count: '6,321',
      favourite: true,
      type: 'Shoe',
      index: 8,
      description: 'The Dr. Martens 1460 is a classic icon in the world of casual boots. Known for its durability and distinctive style, it features a smooth leather upper, air-cushioned sole, and signature yellow stitching. These boots are not only comfortable but also exude timeless fashion.'
    },
    {
      id: '10',
      name: 'Adidas',
      prices: [
        { size: 'S', price: '180', currency: '$' },
        { size: 'M', price: '190', currency: '$' },
        { size: 'L', price: '200', currency: '$' },
      ],
      imagelink_square: require('../assets/images/adidas/adidas7.jpg'),
      imagelink_portrait: require('../assets/images/adidas/adidas7.jpg'),
      average_rating: 4.9,
      ratings_count: '9,835',
      favourite: false,
      type: 'Shoe',
      index: 9,
      description: 'The Adidas Ultraboost is the epitome of comfort and performance for runners. It features a responsive Boost midsole and a flexible, Primeknit upper that adapts to your foot\'s movement. Whether you\'re training for a marathon or going for a jog in the park, these shoes provide the support and style you need.'
    },
    {
      id: '11',
      name: 'New Balance',
      prices: [
        { size: 'S', price: '160', currency: '$' },
        { size: 'M', price: '170', currency: '$' },
        { size: 'L', price: '180', currency: '$' },
      ],
      imagelink_square: require('../assets/images/balance/balance3.jpg'),
      imagelink_portrait: require('../assets/images/balance/balance3.jpg'),
      average_rating: 4.7,
      ratings_count: '8,276',
      favourite: false,
      type: 'Shoe',
      index: 10,
      description: 'The New Balance Fresh Foam 1080 is a top-tier running shoe designed for comfort and performance. It features a plush Fresh Foam midsole and a breathable Hypoknit upper. These shoes provide a smooth and supportive ride for long-distance runners.'
    },
    {
      id: '12',
      name: 'Adidas',
      prices: [
        { size: 'S', price: '55', currency: '$' },
        { size: 'M', price: '60', currency: '$' },
        { size: 'L', price: '65', currency: '$' },
      ],
      imagelink_square: require('../assets/images/adidas/adidas6.jpg'),
      imagelink_portrait: require('../assets/images/adidas/adidas6.jpg'),
      average_rating: 4.5,
      ratings_count: '12,134',
      favourite: true,
      type: 'Shoe',
      index: 11,
      description: 'The Converse Chuck Taylor All Star is a timeless classic in the world of casual footwear. With its canvas upper and iconic design, these sneakers have been a staple for generations. They\'re not just shoes; they\'re a symbol of self-expression and individuality.'
    },
    {
      id: '13',
      name: 'Reebok',
      prices: [
        { size: 'S', price: '120', currency: '$' },
        { size: 'M', price: '130', currency: '$' },
        { size: 'L', price: '140', currency: '$' },
      ],
      imagelink_square: require('../assets/images/reebok/reebok5.jpg'),
      imagelink_portrait: require('../assets/images/reebok/reebok5.jpg'),
      average_rating: 4.8,
      ratings_count: '6,987',
      favourite: true,
      type: 'Shoe',
      index: 12,
      description: 'The Brooks Ghost 13 is a reliable and comfortable running shoe designed for neutral runners. It features BioMoGo DNA cushioning for a smooth ride and a breathable mesh upper. Whether you\'re training for a race or going for a daily jog, these shoes offer the right balance of cushioning and responsiveness.'
    },
    {
      id: '14',
      name: 'Vans',
      prices: [
        { size: 'S', price: '65', currency: '$' },
        { size: 'M', price: '70', currency: '$' },
        { size: 'L', price: '75', currency: '$' },
      ],
      imagelink_square: require('../assets/images/vans/vans10.jpg'),
      imagelink_portrait: require('../assets/images/vans/vans10.jpg'),
      average_rating: 4.6,
      ratings_count: '9,823',
      favourite: false,
      type: 'Shoe',
      index: 13,
      description: 'The Vans Old Skool is an iconic skateboarding shoe that has become a streetwear staple. With its suede and canvas upper and signature side stripe, these sneakers offer both style and durability. Whether you\'re hitting the skate park or exploring the city, these shoes are the perfect choice.'
    },
    {
      id: '15',
      name: 'Nike',
      prices: [
        { size: 'S', price: '140', currency: '$' },
        { size: 'M', price: '180', currency: '$' },
        { size: 'L', price: '200', currency: '$' },
      ],
      imagelink_square: require('../assets/images/nike/nike11.jpg'),
      imagelink_portrait: require('../assets/images/nike/nike11.jpg'),
      average_rating: 4.6,
      ratings_count: '8,219',
      favourite: true,
      type: 'Shoe',
      index: 14,
      description: 'The Nike Air Max 270 is a stylish and comfortable athletic shoe that offers exceptional cushioning. It\'s perfect for running, training, or everyday wear. With its large Air Max unit in the heel, this shoe provides excellent impact absorption, and its modern design adds a touch of urban flair to your outfit.'
    },
    {
      id: '16',
      name: 'Nike',
      prices: [
        { size: 'S', price: '150', currency: '$' },
        { size: 'M', price: '160', currency: '$' },
        { size: 'L', price: '300', currency: '$' },
      ],
      imagelink_square: require('../assets/images/nike/nike8.jpg'),
      imagelink_portrait: require('../assets/images/nike/nike8.jpg'),
      average_rating: 4.6,
      ratings_count: '8,219',
      favourite: true,
      type: 'Shoe',
      index: 15,
      description: 'The Nike Air Max 270 is a stylish and comfortable athletic shoe that offers exceptional cushioning. It\'s perfect for running, training, or everyday wear. With its large Air Max unit in the heel, this shoe provides excellent impact absorption, and its modern design adds a touch of urban flair to your outfit.'
    },
    {
      id: '17',
      name: 'Adidas',
      prices: [
        { size: 'S', price: '55', currency: '$' },
        { size: 'M', price: '760', currency: '$' },
        { size: 'L', price: '125', currency: '$' },
      ],
      imagelink_square: require('../assets/images/adidas/adidas9.jpg'),
      imagelink_portrait: require('../assets/images/adidas/adidas9.jpg'),
      average_rating: 4.5,
      ratings_count: '12,134',
      favourite: true,
      type: 'Shoe',
      index: 16,
      description: 'The Converse Chuck Taylor All Star is a timeless classic in the world of casual footwear. With its canvas upper and iconic design, these sneakers have been a staple for generations. They\'re not just shoes; they\'re a symbol of self-expression and individuality.'
    },
    {
      id: '18',
      name: 'Puma',
      prices: [
        { size: 'S', price: '120', currency: '$' },
        { size: 'M', price: '160', currency: '$' },
        { size: 'L', price: '190', currency: '$' },
      ],
      imagelink_square: require('../assets/images/puma/puma7.jpg'),
      imagelink_portrait: require('../assets/images/puma/puma7.jpg'),
      average_rating: 4.5,
      ratings_count: '5,712',
      favourite: true,
      type: 'Shoe',
      index: 17,
      description: 'The Puma RS-X is a sporty and bold sneaker with a chunky, futuristic design. It offers a mix of comfort and style, making it a great choice for athletic activities and streetwear fashion. With its vibrant colorways and innovative design, you\'ll stand out from the crowd.'
    },
    {
      id: '19',
      name: 'New Balance',
      prices: [
        { size: 'S', price: '85', currency: '$' },
        { size: 'M', price: '150', currency: '$' },
        { size: 'L', price: '325', currency: '$' },
      ],
      imagelink_square: require('../assets/images/balance/balance6.jpg'),
      imagelink_portrait: require('../assets/images/balance/balance6.jpg'),
      average_rating: 4.9,
      ratings_count: '9,324',
      favourite: true,
      type: 'Shoe',
      index: 18,
      description: 'The New Balance 990 is a premium running shoe known for its exceptional comfort and quality. Its ENCAP midsole technology provides superior cushioning and support for long-distance running. This shoe combines performance with a classic design, making it a favorite among serious runners.'
    },
    {
      id: '20',
      name: 'Vans',
      prices: [
        { size: 'S', price: '190', currency: '$' },
        { size: 'M', price: '265', currency: '$' },
        { size: 'L', price: '332', currency: '$' },
      ],
      imagelink_square: require('../assets/images/vans/vans8.jpg'),
      imagelink_portrait: require('../assets/images/vans/vans8.jpg'),
      average_rating: 4.7,
      ratings_count: '4,127',
      favourite: false,
      type: 'Shoe',
      index: 19,
      description: 'The Brooks Ghost 14 is a top choice for runners seeking a balance between comfort and performance. It offers a plush cushioning system and a smooth ride, making it ideal for long training sessions or marathons. Its breathable mesh upper ensures your feet stay cool and comfortable during your runs.'
    },
    {
      id: '21',
      name: 'Dr. Martens 1460',
      prices: [
        { size: 'S', price: '654', currency: '$' },
        { size: 'M', price: '876', currency: '$' },
        { size: 'L', price: '892', currency: '$' },
      ],
      imagelink_square: require('../assets/images/nike/nike6.jpg'),
      imagelink_portrait: require('../assets/images/nike/nike6.jpg'),
      average_rating: 4.6,
      ratings_count: '6,321',
      favourite: true,
      type: 'Shoe',
      index: 20,
      description: 'The Dr. Martens 1460 is a classic icon in the world of casual boots. Known for its durability and distinctive style, it features a smooth leather upper, air-cushioned sole, and signature yellow stitching. These boots are not only comfortable but also exude timeless fashion.'
    },
    {
      id: '22',
      name: 'Reebok',
      prices: [
        { size: 'S', price: '50', currency: '$' },
        { size: 'M', price: '76', currency: '$' },
        { size: 'L', price: '90', currency: '$' },
      ],
      imagelink_square: require('../assets/images/reebok/reebok2.jpg'),
      imagelink_portrait: require('../assets/images/reebok/reebok2.jpg'),
      average_rating: 4.8,
      ratings_count: '6,987',
      favourite: true,
      type: 'Shoe',
      index: 21,
      description: 'The Brooks Ghost 13 is a reliable and comfortable running shoe designed for neutral runners. It features BioMoGo DNA cushioning for a smooth ride and a breathable mesh upper. Whether you\'re training for a race or going for a daily jog, these shoes offer the right balance of cushioning and responsiveness.'
    },
    // You can continue to add more shoe data entries as needed, or modify existing entries to make your dataset even more diverse.
    
    ];
    
  export default ShoeData;
  
  