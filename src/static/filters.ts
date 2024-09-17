export const allSize = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

export const allColors = [
   'All',
   'White',
   'Black',
   'Red',
   'Blue',
   'Green',
   'Yellow',
   'Orange',
   'Purple',
   'Pink',
   'Gray',
   'Brown',
   'Beige',
   'Navy',
   'Turquoise',
   'Lime',
   'Olive',
   'Teal',
   'Sky',
   'Plum',
   'Fuchsia',
   'Lavender',
   'Magenta',
   'Rose',
   'Amber',
]

export const allCategories = {
   Fashion: {
      Men: ['Clothing', 'Shoes', 'Watches', 'Accessories'],
      Women: ['Clothing', 'Shoes', 'Jewelry', 'Bags', 'Accessories'],
      Kids: ['Clothing', 'Shoes', 'Accessories'],
      Accessories: ['Sunglasses', 'Bags', 'Belts', 'Hats', 'Jewelry'],
   },
   Electronics: {
      'Mobile Phones': ['Smartphones', 'Basic Phones', 'Phone Accessories'],
      Laptops: ['Ultrabooks', 'Gaming Laptops', 'Business Laptops', 'Laptop Accessories'],
      Cameras: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Camera Accessories'],
      'Television & Audio': ['LED TVs', 'Smart TVs', 'Sound Systems', 'Headphones'],
      'Wearable Technology': ['Smartwatches', 'Fitness Trackers', 'VR Headsets'],
      'Home Appliances': ['Refrigerators', 'Washing Machines', 'Microwaves', 'Vacuum Cleaners'],
   },
   'Home & Kitchen': {
      Furniture: ['Living Room Furniture', 'Bedroom Furniture', 'Office Furniture'],
      'Kitchen Appliances': ['Microwaves', 'Ovens', 'Coffee Makers', 'Blenders'],
      'Home Decor': ['Wall Art', 'Lighting', 'Rugs', 'Curtains'],
      Bedding: ['Bedsheets', 'Pillows', 'Mattresses', 'Blankets'],
      'Tools & DIY': ['Hand Tools', 'Power Tools', 'Gardening Tools'],
   },
   'Beauty & Personal Care': {
      Skincare: ['Moisturizers', 'Cleansers', 'Serums', 'Sunscreen'],
      'Hair Care': ['Shampoos', 'Conditioners', 'Hair Styling', 'Hair Color'],
      Fragrances: ['Perfume', 'Body Sprays', 'Cologne'],
      Makeup: ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara'],
   },
   'Sports & Outdoors': {
      'Fitness Equipment': ['Treadmills', 'Dumbbells', 'Yoga Mats', 'Resistance Bands'],
      'Outdoor Gear': ['Camping Tents', 'Sleeping Bags', 'Backpacks', 'Climbing Gear'],
      Sportswear: ['Activewear', 'Sports Shoes', 'Sweatbands'],
      'Camping & Hiking': ['Tents', 'Hiking Shoes', 'Trekking Poles', 'Portable Stoves'],
   },
   Books: {
      Fiction: ['Science Fiction', 'Fantasy', 'Mystery', 'Romance'],
      'Non-fiction': ['Biographies', 'Self-Help', 'History', 'Science'],
      "Children's Books": ['Picture Books', 'Early Readers', 'Young Adult'],
      Textbooks: ['School Textbooks', 'College Textbooks', 'Reference Books'],
      'E-books': ['Fiction E-books', 'Non-fiction E-books', 'Educational E-books'],
   },
   'Toys & Games': {
      'Action Figures': ['Superheroes', 'Movie Characters', 'Video Game Characters'],
      Puzzles: ['Jigsaw Puzzles', 'Brain Teasers', '3D Puzzles'],
      'Board Games': ['Classic Games', 'Strategy Games', 'Card Games'],
      Dolls: ['Barbie Dolls', 'Baby Dolls', 'Collectible Dolls'],
      'Outdoor Toys': ['Bicycles', 'Scooters', 'Playhouses', 'Water Toys'],
   },
   Automotive: {
      'Car Accessories': ['Seat Covers', 'Floor Mats', 'Air Fresheners', 'Car Electronics'],
      'Motorcycle Gear': ['Helmets', 'Jackets', 'Gloves', 'Boots'],
      'Tools & Equipment': ['Wrenches', 'Socket Sets', 'Car Jacks'],
      'Car Care': ['Car Wash', 'Polish', 'Waxes', 'Cleaning Kits'],
   },
   Health: {
      Supplements: ['Vitamins', 'Protein Powders', 'Herbal Supplements'],
      'Medical Equipment': ['Blood Pressure Monitors', 'Thermometers', 'First Aid Kits'],
      Fitness: ['Exercise Bikes', 'Treadmills', 'Resistance Bands'],
      'Personal Hygiene': ['Soap', 'Sanitizers', 'Toothpaste', 'Deodorants'],
   },
   Jewelry: {
      Rings: ['Engagement Rings', 'Wedding Bands', 'Fashion Rings'],
      Necklaces: ['Chains', 'Pendants', 'Lockets'],
      Bracelets: ['Bangles', 'Charm Bracelets', 'Cuffs'],
      Earrings: ['Studs', 'Hoops', 'Drop Earrings'],
   },
   'Office Supplies': {
      'Office Electronics': ['Printers', 'Scanners', 'Laminators', 'Shredders'],
      Stationery: ['Notebooks', 'Pens', 'Markers', 'Sticky Notes'],
      'Office Furniture': ['Desks', 'Chairs', 'Filing Cabinets', 'Bookcases'],
      'Paper Products': ['Copy Paper', 'Envelopes', 'Notepads', 'Folders'],
   },
   'Pet Supplies': {
      Dogs: ['Dog Food', 'Dog Toys', 'Dog Beds', 'Leashes & Collars'],
      Cats: ['Cat Food', 'Litter Boxes', 'Scratching Posts', 'Cat Toys'],
      Birds: ['Bird Food', 'Cages', 'Perches', 'Toys'],
      Fish: ['Aquariums', 'Fish Food', 'Water Conditioners', 'Filters'],
   },
}


export const allCategoriesFilters = {
   Fashion: {
      Men: {
         Clothing: {
            filters: ['size', 'color', 'brand', 'material', 'fit', 'pattern', 'sleeveLength', 'occasion', 'collarType'],
         },
         Shoes: {
            filters: ['size', 'color', 'brand', 'heelType', 'toeShape', 'gender', 'material', 'occasion', 'soleMaterial', 'closureType'],
         },
         Watches: {
            filters: ['brand', 'strapMaterial', 'waterResistance', 'caseMaterial', 'dialColor', 'movementType'],
         },
         Accessories: {
            filters: ['brand', 'material', 'color', 'occasion', 'gender'],
         },
      },
      Women: {
         Clothing: {
            filters: ['size', 'color', 'brand', 'material', 'fit', 'pattern', 'neckline', 'sleeveLength', 'occasion'],
         },
         Shoes: {
            filters: ['size', 'color', 'brand', 'heelType', 'toeShape', 'material', 'occasion', 'soleMaterial', 'closureType'],
         },
         Jewelry: {
            filters: ['type', 'metal', 'gemstone', 'brand', 'occasion', 'gender'],
         },
         Bags: {
            filters: ['size', 'brand', 'material', 'style', 'color', 'closureType', 'strapType'],
         },
         Accessories: {
            filters: ['brand', 'material', 'color', 'occasion', 'gender'],
         },
      },
      Kids: {
         Clothing: {
            filters: ['size', 'color', 'brand', 'material', 'fit', 'pattern', 'sleeveLength', 'occasion'],
         },
         Shoes: {
            filters: ['size', 'color', 'brand', 'material', 'soleMaterial', 'closureType', 'gender'],
         },
         Accessories: {
            filters: ['brand', 'material', 'color', 'occasion', 'gender'],
         },
      },
      Accessories: {
         Sunglasses: {
            filters: ['brand', 'frameMaterial', 'lensColor', 'lensMaterial', 'frameShape', 'polarized'],
         },
         Bags: {
            filters: ['size', 'brand', 'material', 'style', 'color', 'closureType', 'strapType'],
         },
         Belts: {
            filters: ['size', 'material', 'brand', 'buckleType', 'color'],
         },
         Hats: {
            filters: ['size', 'material', 'brand', 'color', 'style', 'occasion'],
         },
         Jewelry: {
            filters: ['type', 'metal', 'gemstone', 'brand', 'occasion', 'gender'],
         },
      },
   },
   Electronics: {
      'Mobile Phones': {
         Smartphones: {
            filters: ['brand', 'screenSize', 'batteryCapacity', 'RAM', 'storage', 'cameraResolution', 'operatingSystem', 'color'],
         },
         'Basic Phones': {
            filters: ['brand', 'screenSize', 'batteryCapacity', 'color'],
         },
         'Phone Accessories': {
            filters: ['type', 'brand', 'compatibility', 'color'],
         },
      },
      Laptops: {
         Ultrabooks: {
            filters: ['brand', 'screenSize', 'RAM', 'storage', 'processor', 'graphicsCard', 'operatingSystem', 'batteryLife'],
         },
         'Gaming Laptops': {
            filters: ['brand', 'screenSize', 'RAM', 'storage', 'processor', 'graphicsCard', 'refreshRate', 'coolingSystem'],
         },
         'Business Laptops': {
            filters: ['brand', 'screenSize', 'RAM', 'storage', 'processor', 'operatingSystem', 'batteryLife'],
         },
         'Laptop Accessories': {
            filters: ['type', 'brand', 'compatibility', 'color'],
         },
      },
      Cameras: {
         DSLR: {
            filters: ['brand', 'megapixels', 'sensorType', 'lensType', 'screenSize', 'batteryLife', 'ISORange', 'videoResolution'],
         },
         Mirrorless: {
            filters: ['brand', 'megapixels', 'sensorType', 'lensType', 'screenSize', 'batteryLife', 'ISORange', 'videoResolution'],
         },
         'Point & Shoot': {
            filters: ['brand', 'megapixels', 'sensorType', 'opticalZoom', 'screenSize', 'batteryLife'],
         },
         'Camera Accessories': {
            filters: ['type', 'brand', 'compatibility'],
         },
      },
      'Television & Audio': {
         'LED TVs': {
            filters: ['brand', 'screenSize', 'resolution', 'refreshRate', 'smartTV', 'HDMIports'],
         },
         'Smart TVs': {
            filters: ['brand', 'screenSize', 'resolution', 'refreshRate', 'operatingSystem', 'HDMIports'],
         },
         'Sound Systems': {
            filters: ['brand', 'channelConfiguration', 'connectivity', 'powerOutput', 'subwoofer'],
         },
         Headphones: {
            filters: ['brand', 'type', 'connectivity', 'noiseCancellation', 'batteryLife', 'color'],
         },
      },
      'Wearable Technology': {
         Smartwatches: {
            filters: ['brand', 'screenSize', 'batteryLife', 'connectivity', 'operatingSystem', 'color'],
         },
         'Fitness Trackers': {
            filters: ['brand', 'batteryLife', 'waterResistance', 'heartRateMonitor', 'connectivity', 'color'],
         },
         'VR Headsets': {
            filters: ['brand', 'resolution', 'fieldOfView', 'connectivity', 'compatibility'],
         },
      },
      'Home Appliances': {
         Refrigerators: {
            filters: ['brand', 'capacity', 'energyRating', 'type', 'color'],
         },
         'Washing Machines': {
            filters: ['brand', 'capacity', 'energyRating', 'loadType', 'color'],
         },
         Microwaves: {
            filters: ['brand', 'capacity', 'type', 'color'],
         },
         'Vacuum Cleaners': {
            filters: ['brand', 'type', 'capacity', 'powerOutput', 'weight'],
         },
      },
   },
   'Home & Kitchen': {
      Furniture: {
         'Living Room Furniture': {
            filters: ['material', 'brand', 'color', 'size', 'style', 'weightCapacity'],
         },
         'Bedroom Furniture': {
            filters: ['material', 'brand', 'color', 'size', 'style'],
         },
         'Office Furniture': {
            filters: ['material', 'brand', 'color', 'size', 'adjustability'],
         },
      },
      'Kitchen Appliances': {
         filters: ['brand', 'capacity', 'powerOutput', 'color', 'material'],
      },
      'Home Decor': {
         filters: ['type', 'material', 'color', 'style', 'size', 'brand'],
      },
      Bedding: {
         filters: ['size', 'material', 'brand', 'color', 'threadCount'],
      },
      'Tools & DIY': {
         filters: ['type', 'brand', 'powerSource', 'material'],
      },
   },
   'Beauty & Personal Care': {
      Skincare: {
         filters: ['skinType', 'brand', 'ingredient', 'formulation', 'SPF', 'concerns'],
      },
      'Hair Care': {
         filters: ['hairType', 'brand', 'ingredient', 'concerns', 'formulation'],
      },
      Fragrances: {
         filters: ['brand', 'type', 'notes', 'size', 'gender'],
      },
      Makeup: {
         filters: ['brand', 'shade', 'formulation', 'finish', 'skinType'],
      },
   },
   'Sports & Outdoors': {
      'Fitness Equipment': {
         filters: ['type', 'brand', 'material', 'weight', 'capacity'],
      },
      'Outdoor Gear': {
         filters: ['type', 'brand', 'material', 'size', 'weight', 'color'],
      },
      Sportswear: {
         filters: ['size', 'brand', 'material', 'fit', 'gender', 'color'],
      },
      'Camping & Hiking': {
         filters: ['type', 'brand', 'material', 'size', 'weight', 'weatherResistance'],
      },
   },
   Books: {
      Fiction: {
         filters: ['genre', 'author', 'language', 'binding', 'publicationYear'],
      },
      'Non-fiction': {
         filters: ['genre', 'author', 'language', 'binding', 'publicationYear'],
      },
      "Children's Books": {
         filters: ['ageGroup', 'author', 'language', 'binding', 'illustrations'],
      },
      Textbooks: {
         filters: ['subject', 'author', 'educationLevel', 'language'],
      },
      'E-books': {
         filters: ['genre', 'author', 'language', 'format'],
      },
   },
   'Toys & Games': {
      'Action Figures': {
         filters: ['type', 'brand', 'material', 'ageGroup', 'gender'],
      },
      Puzzles: {
         filters: ['type', 'brand', 'pieces', 'material', 'ageGroup'],
      },
      'Board Games': {
         filters: ['type', 'brand', 'players', 'ageGroup'],
      },
      Dolls: {
         filters: ['type', 'brand', 'material', 'ageGroup', 'gender'],
      },
      'Outdoor Toys': {
         filters: ['type', 'brand', 'material', 'ageGroup', 'weightCapacity'],
      },
   },
   Automotive: {
      'Car Accessories': {
         filters: ['type', 'brand', 'material', 'compatibility'],
      },
      'Motorcycle Gear': {
         filters: ['type', 'brand', 'material', 'size', 'gender'],
      },
      'Tools & Equipment': {
         filters: ['type', 'brand', 'material', 'powerSource'],
      },
      'Car Care': {
         filters: ['type', 'brand', 'size', 'formulation'],
      },
   },
   Health: {
      Supplements: {
         filters: ['type', 'brand', 'ingredients', 'formulation', 'purpose'],
      },
      'Medical Equipment': {
         filters: ['type', 'brand', 'compatibility', 'batteryLife'],
      },
      Fitness: {
         filters: ['type', 'brand', 'material', 'capacity', 'powerOutput'],
      },
      'Personal Hygiene': {
         filters: ['type', 'brand', 'ingredients', 'formulation'],
      },
   },
   Jewelry: {
      Rings: {
         filters: ['material', 'gemstone', 'brand', 'size', 'occasion'],
      },
      Necklaces: {
         filters: ['material', 'gemstone', 'brand', 'length', 'occasion'],
      },
      Bracelets: {
         filters: ['material', 'gemstone', 'brand', 'size', 'occasion'],
      },
      Earrings: {
         filters: ['material', 'gemstone', 'brand', 'style', 'occasion'],
      },
   },
   'Office Supplies': {
      'Office Electronics': {
         filters: ['type', 'brand', 'compatibility', 'powerSource'],
      },
      Stationery: {
         filters: ['type', 'brand', 'material', 'size', 'color'],
      },
      'Office Furniture': {
         filters: ['material', 'brand', 'size', 'adjustability', 'color'],
      },
      'Paper Products': {
         filters: ['type', 'brand', 'size', 'color'],
      },
   },
   'Pet Supplies': {
      Dogs: {
         filters: ['type', 'brand', 'size', 'flavor', 'material'],
      },
      Cats: {
         filters: ['type', 'brand', 'size', 'flavor', 'material'],
      },
      Birds: {
         filters: ['type', 'brand', 'size', 'material'],
      },
      Fish: {
         filters: ['type', 'brand', 'size', 'material'],
      },
   },
};
