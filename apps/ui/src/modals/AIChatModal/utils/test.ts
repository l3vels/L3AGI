import random from 'lodash/random'

export const collection1 = {
  id: 1,
  name: "Empire's Arsenal",
  description:
    'A stunning assembly of tools, trinkets, and artifacts wielded by emperors past, each embodying a unique aspect of territorial strategy and conquest.',
  categories: ['Strategy', 'Conquest'],
  attributes: [
    { id: 1, name: 'Power', min: '1', max: '100', description: "Represents asset's potency" },
    { id: 2, name: 'Rarity', min: '1', max: '5', description: "Indicates asset's scarcity" },
    { id: 3, name: 'Durability', min: '1', max: '100', description: "Shows asset's resilience" },
    {
      id: 4,
      name: 'Versatility',
      min: '1',
      max: '100',
      description: "Indicates asset's adaptability",
    },
    { id: 5, name: 'Charm', min: '1', max: '100', description: "Shows asset's allure" },
  ],
  properties: [
    { id: 1, name: 'Color', description: 'Visual hue of the asset' },
    { id: 2, name: 'Size', description: 'Physical proportions of the asset' },
    { id: 3, name: 'Shape', description: 'Form or contour of the asset' },
    { id: 4, name: 'Material', description: 'Substance the asset is made of' },
    { id: 5, name: 'Texture', description: 'Surface feel of the asset' },
  ],
  assets: [
    {
      id: 1,
      name: "Conqueror's Banner",
      description: 'A majestic flag that once rallied armies to victory',
      attributes: [
        { id: 1, name: 'Power', value: '70' },
        { id: 2, name: 'Rarity', value: '4' },
        { id: 3, name: 'Durability', value: '50' },
        { id: 4, name: 'Versatility', value: '30' },
        { id: 5, name: 'Charm', value: '90' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Gold' },
        { id: 2, name: 'Size', value: 'Large' },
        { id: 3, name: 'Shape', value: 'Rectangular' },
        { id: 4, name: 'Material', value: 'Silk' },
        { id: 5, name: 'Texture', value: 'Smooth' },
      ],
    },
    {
      id: 2,
      name: "Sovereign's Scepter",
      description: 'A royal staff symbolizing authority and power',
      attributes: [
        { id: 1, name: 'Power', value: '90' },
        { id: 2, name: 'Rarity', value: '5' },
        { id: 3, name: 'Durability', value: '80' },
        { id: 4, name: 'Versatility', value: '60' },
        { id: 5, name: 'Charm', value: '70' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Silver' },
        { id: 2, name: 'Size', value: 'Medium' },
        { id: 3, name: 'Shape', value: 'Cylindrical' },
        { id: 4, name: 'Material', value: 'Metal' },
        { id: 5, name: 'Texture', value: 'Smooth' },
      ],
    },
    {
      id: 3,
      name: "Diplomat's Quill",
      description: 'A feathered pen that has signed countless treaties',
      attributes: [
        { id: 1, name: 'Power', value: '40' },
        { id: 2, name: 'Rarity', value: '3' },
        { id: 3, name: 'Durability', value: '20' },
        { id: 4, name: 'Versatility', value: '80' },
        { id: 5, name: 'Charm', value: '60' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Black' },
        { id: 2, name: 'Size', value: 'Small' },
        { id: 3, name: 'Shape', value: 'Linear' },
        { id: 4, name: 'Material', value: 'Feather' },
        { id: 5, name: 'Texture', value: 'Soft' },
      ],
    },
    {
      id: 4,
      name: "General's Map",
      description: 'A tattered chart that guided legions through winding battles',
      attributes: [
        { id: 1, name: 'Power', value: '60' },
        { id: 2, name: 'Rarity', value: '2' },
        { id: 3, name: 'Durability', value: '30' },
        { id: 4, name: 'Versatility', value: '70' },
        { id: 5, name: 'Charm', value: '50' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Multicolor' },
        { id: 2, name: 'Size', value: 'Large' },
        { id: 3, name: 'Shape', value: 'Rectangular' },
        { id: 4, name: 'Material', value: 'Parchment' },
        { id: 5, name: 'Texture', value: 'Rough' },
      ],
    },
    {
      id: 5,
      name: "Merchant's Coin",
      description: 'An ancient coin that bought kingdoms and sold wars',
      attributes: [
        { id: 1, name: 'Power', value: '50' },
        { id: 2, name: 'Rarity', value: '1' },
        { id: 3, name: 'Durability', value: '100' },
        { id: 4, name: 'Versatility', value: '40' },
        { id: 5, name: 'Charm', value: '80' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Gold' },
        { id: 2, name: 'Size', value: 'Small' },
        { id: 3, name: 'Shape', value: 'Circular' },
        { id: 4, name: 'Material', value: 'Gold' },
        { id: 5, name: 'Texture', value: 'Smooth' },
      ],
    },
  ],
}

const collection2 = {
  id: 2,
  name: 'Legendary Sea Creatures',
  description: 'Unlock the mythical powers of the sea with these legendary mascots.',
  categories: ['Aquatic', 'Mascots'],
  attributes: [
    {
      id: 1,
      name: 'Luck',
      min: '1',
      max: '10',
      description: 'Influence the random elements of the game.',
    },
    {
      id: 2,
      name: 'Inspiration',
      min: '1',
      max: '10',
      description: "Boost your team's morale and performance.",
    },
    {
      id: 3,
      name: 'Intimidation',
      min: '1',
      max: '10',
      description: 'Make your opponents think twice before challenging you.',
    },
    {
      id: 4,
      name: 'Wisdom',
      min: '1',
      max: '10',
      description: 'Use the wisdom of the sea to strategize better.',
    },
    {
      id: 5,
      name: 'Endurance',
      min: '1',
      max: '10',
      description: 'Help your team withstand the toughest challenges.',
    },
  ],
  properties: [
    {
      id: 1,
      name: 'Appearance',
      description: 'The visual representation of the mascot.',
    },
    {
      id: 2,
      name: 'Special Ability',
      description: 'A unique power that affects gameplay.',
    },
    {
      id: 3,
      name: 'Origin Story',
      description: 'The lore behind the mascot.',
    },
    {
      id: 4,
      name: 'Special Performance',
      description: 'A unique animation or display during halftime.',
    },
    {
      id: 5,
      name: 'Cheer Effect',
      description: 'A unique sound or music that plays when the team scores.',
    },
  ],
  assets: [
    {
      id: 1,
      name: "Poseidon's Pufferfish",
      description: "This legendary pufferfish was said to be Poseidon's favorite pet.",
      attributes: [
        {
          id: 1,
          name: 'Luck',
          value: '9',
        },
        {
          id: 2,
          name: 'Inspiration',
          value: '7',
        },
        {
          id: 3,
          name: 'Intimidation',
          value: '6',
        },
        {
          id: 4,
          name: 'Wisdom',
          value: '8',
        },
        {
          id: 5,
          name: 'Endurance',
          value: '5',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Appearance',
          value: 'A glowing golden pufferfish with a regal aura.',
        },
        {
          id: 2,
          name: 'Special Ability',
          value:
            "Poseidon's Blessing: A slight chance for a stronger wave that can push the ball towards the opponent's goal.",
        },
        {
          id: 3,
          name: 'Origin Story',
          value:
            'Once a pet of Poseidon, this pufferfish embodies the might and unpredictability of the sea.',
        },
        {
          id: 4,
          name: 'Special Performance',
          value: 'Performs a dazzling whirlpool dance during halftime.',
        },
        { id: 5, name: 'Cheer Effect', value: 'A triumphant sea-horn sound when the team scores.' },
      ],
    },
    {
      id: 2,
      name: "Kraken's Koi",
      description: "The Kraken's Koi is said to have the power to control the sea's currents.",
      attributes: [
        { id: 1, name: 'Luck', value: '6' },
        { id: 2, name: 'Inspiration', value: '8' },
        { id: 3, name: 'Intimidation', value: '9' },
        { id: 4, name: 'Wisdom', value: '7' },
        { id: 5, name: 'Endurance', value: '7' },
      ],
      properties: [
        { id: 1, name: 'Appearance', value: 'A large, majestic red koi with a stern look.' },
        {
          id: 2,
          name: 'Special Ability',
          value: "Kraken's Command: Causes a current that can slightly alter the ball's direction.",
        },
        {
          id: 3,
          name: 'Origin Story',
          value:
            "A koi that absorbed the Kraken's power, it has an intimidating presence on the field.",
        },
        {
          id: 4,
          name: 'Special Performance',
          value: 'Summons an image of the Kraken during halftime.',
        },
        {
          id: 5,
          name: 'Cheer Effect',
          value: 'An ominous wave-crashing sound when the team scores.',
        },
      ],
    },
    {
      id: 3,
      name: "Siren's Seahorse",
      description:
        'This seahorse was once the mount of a powerful siren, and is as graceful as it is swift.',
      attributes: [
        { id: 1, name: 'Luck', value: '7' },
        { id: 2, name: 'Inspiration', value: '9' },
        { id: 3, name: 'Intimidation', value: '5' },
        { id: 4, name: 'Wisdom', value: '8' },
        { id: 5, name: 'Endurance', value: '6' },
      ],
      properties: [
        {
          id: 1,
          name: 'Appearance',
          value: 'A delicate, glowing seahorse with a captivating aura.',
        },
        {
          id: 2,
          name: 'Special Ability',
          value: "Siren's Song: A chance to momentarily confuse the opposing team.",
        },
        {
          id: 3,
          name: 'Origin Story',
          value:
            'This seahorse absorbed the magic of its siren rider, making it a sight to behold.',
        },
        {
          id: 4,
          name: 'Special Performance',
          value: 'Performs a mesmerizing dance, projecting an image of the siren during halftime.',
        },
        {
          id: 5,
          name: 'Cheer Effect',
          value: "A melodic siren's song plays when the team scores.",
        },
      ],
    },
    {
      id: 4,
      name: "Leviathan's Lobster",
      description: 'This lobster was blessed by the Leviathan, making it tougher than it looks.',
      attributes: [
        { id: 1, name: 'Luck', value: '5' },
        { id: 2, name: 'Inspiration', value: '6' },
        { id: 3, name: 'Intimidation', value: '8' },
        { id: 4, name: 'Wisdom', value: '7' },
        { id: 5, name: 'Endurance', value: '10' },
      ],
      properties: [
        {
          id: 1,
          name: 'Appearance',
          value: 'A large, sturdy lobster with a tough shell and a strong aura.',
        },
        {
          id: 2,
          name: 'Special Ability',
          value: "Leviathan's Shield: A chance to resist a powerful attack.",
        },
        {
          id: 3,
          name: 'Origin Story',
          value: 'Blessed by the Leviathan, this lobster symbolizes unyielding endurance.',
        },
        {
          id: 4,
          name: 'Special Performance',
          value: 'Creates a giant wave as it claps its claws during halftime.',
        },
        {
          id: 5,
          name: 'Cheer Effect',
          value: 'A powerful wave-crashing sound when the team scores.',
        },
      ],
    },
    {
      id: 5,
      name: "Triton's Turtle",
      description: "Triton's Turtle is known to bring good fortune and wisdom to its team.",
      attributes: [
        { id: 1, name: 'Luck', value: '10' },
        { id: 2, name: 'Inspiration', value: '6' },
        { id: 3, name: 'Intimidation', value: '5' },
        { id: 4, name: 'Wisdom', value: '9' },
        { id: 5, name: 'Endurance', value: '7' },
      ],
      properties: [
        {
          id: 1,
          name: 'Appearance',
          value: 'A wise, ancient turtle with a shell covered in ancient sea symbols.',
        },
        {
          id: 2,
          name: 'Special Ability',
          value: "Triton's Favor: A chance for the team to get an extra boost of speed.",
        },
        {
          id: 3,
          name: 'Origin Story',
          value:
            'Gifted by Triton himself, this turtle has been around since ancient times and brings good fortune.',
        },
        {
          id: 4,
          name: 'Special Performance',
          value: 'Unfurls a magical sea-current pattern on the field during halftime.',
        },
        {
          id: 5,
          name: 'Cheer Effect',
          value: 'An uplifting sea shanty plays when the team scores.',
        },
      ],
    },
  ],
}

// ---------------------------
const collection3 = {
  id: 1,
  name: 'Wave Strikers',
  description:
    'A fast-paced sports game that features mini football players riding on high-tech water scooters, playing football in a stunning sea environment. Teams of players work together to score goals, but with the added challenge of maintaining their balance and navigating the ocean waves. Using smart tactics and raw skill, players must outplay their opponents to achieve victory in this thrilling water sports football game.',
  categories: ['Mini Football Players', 'Water Scooters', 'Footballs'],
  attributes: [
    {
      id: 1,
      name: 'Speed',
      min: 1,
      max: 10,
      description: 'The speed of the water scooter.',
    },
    {
      id: 2,
      name: 'Agility',
      min: 1,
      max: 10,
      description: 'The agility of the water scooter.',
    },
    {
      id: 3,
      name: 'Durability',
      min: 1,
      max: 10,
      description: 'The durability of the water scooter.',
    },
    {
      id: 4,
      name: 'Maneuverability',
      min: 1,
      max: 10,
      description: 'The maneuverability of the water scooter.',
    },
    {
      id: 5,
      name: 'Power',
      min: 1,
      max: 10,
      description: 'The power of the water scooter.',
    },
  ],
  properties: [
    {
      id: 1,
      name: 'Color',
      description: 'The color of the water scooter.',
    },
    {
      id: 2,
      name: 'Design',
      description: 'The design of the water scooter.',
    },
    {
      id: 3,
      name: 'Brand',
      description: 'The brand of the water scooter.',
    },
    {
      id: 4,
      name: 'Model',
      description: 'The model of the water scooter.',
    },
    {
      id: 5,
      name: 'Year',
      description: 'The year of the water scooter.',
    },
  ],
  assets: [
    {
      id: 1,
      name: 'Mini Football Player',
      description: 'A mini football player that can ride a water scooter.',
      attributes: [
        {
          id: 1,
          name: 'Speed',
          value: 5,
        },
        {
          id: 2,
          name: 'Agility',
          value: 7,
        },
        {
          id: 3,
          name: 'Durability',
          value: 8,
        },
        {
          id: 4,
          name: 'Maneuverability',
          value: 9,
        },
        {
          id: 5,
          name: 'Power',
          value: 6,
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Color',
          value: 'Red',
        },
        {
          id: 2,
          name: 'Design',
          value: 'Classic',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Air Max',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
    },
    {
      id: 2,
      name: 'Water Scooter',
      description: 'A high-tech water scooter that can be used to playfootball on the water.',
      attributes: [
        {
          id: 1,
          name: 'Speed',
          value: 8,
        },
        {
          id: 2,
          name: 'Agility',
          value: 6,
        },
        {
          id: 3,
          name: 'Durability',
          value: 9,
        },
        {
          id: 4,
          name: 'Maneuverability',
          value: 7,
        },
        {
          id: 5,
          name: 'Power',
          value: 10,
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Color',
          value: 'Blue',
        },
        {
          id: 2,
          name: 'Design',
          value: 'Modern',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Honda',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Jet Ski',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
    },
    {
      id: 3,
      name: 'Football',
      description: 'A football that can be used to play football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: '12',
        },
        {
          id: 2,
          name: 'Weight',
          value: '14 ounces',
        },
        {
          id: 3,
          name: 'Material',
          value: 'Rubber',
        },
        {
          id: 4,
          name: 'Color',
          value: 'White',
        },
        {
          id: 5,
          name: 'Brand',
          value: 'Nike',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Classic',
        },
      ],
    },
    {
      id: 4,
      name: 'Goal',
      description: 'A goal that can be used to score goals in football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Height',
          value: '8 feet',
        },
        {
          id: 2,
          name: 'Width',
          value: '6 feet',
        },
        {
          id: 3,
          name: 'Material',
          value: 'Plastic',
        },
        {
          id: 4,
          name: 'Color',
          value: 'Blue',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Modern',
        },
      ],
    },
    {
      id: 5,
      name: 'T-Shirt',
      description: 'A t-shirt that can be worn by players while playing football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: 'Medium',
        },
        {
          id: 2,
          name: 'Color',
          value: 'Red',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Classic',
        },
      ],
    },
  ],
}

const collection4 = {
  id: 1,
  name: 'Wave Strikers Collection',
  description:
    'Collection of mini football players and high-tech water scooters for the Wave Strikers game, each with unique abilities and appearances.',
  categories: ['Players', 'Water Scooters'],
  attributes: [
    {
      id: 1,
      name: 'Speed',
      min: '1',
      max: '10',
      description: 'Determines how fast a player or scooter can move.',
    },
    {
      id: 2,
      name: 'Agility',
      min: '1',
      max: '10',
      description: 'Affects the ability to perform tricks and evade opponents.',
    },
    {
      id: 3,
      name: 'Strength',
      min: '1',
      max: '10',
      description: 'Determines the power of shots and resistance to tackles.',
    },
    {
      id: 4,
      name: 'Control',
      min: '1',
      max: '10',
      description: 'Affects the ability to handle the football and scooter.',
    },
    {
      id: 5,
      name: 'Stamina',
      min: '1',
      max: '10',
      description: 'Determines how long a player can maintain peak performance.',
    },
  ],
  properties: [
    {
      id: 1,
      name: 'Appearance',
      description: 'Defines the visual aspects of the player and scooter.',
    },
    {
      id: 2,
      name: 'Signature Trick',
      description: 'A unique stunt that a player can perform for bonus points.',
    },
    {
      id: 3,
      name: 'Team Affiliation',
      description: 'Determines which team the player belongs to.',
    },
    {
      id: 4,
      name: 'Special Ability',
      description: 'A unique power that can be activated during gameplay.',
    },
    { id: 5, name: 'Home Wave', description: "The player's preferred sea environment." },
  ],
  assets: [
    {
      id: 1,
      name: 'Wave Rider',
      description: 'A player known for his mastery of riding the waves.',
      attributes: [
        { id: 1, name: 'Speed', value: '7' },
        { id: 2, name: 'Agility', value: '9' },
        { id: 3, name: 'Strength', value: '5' },
        { id: 4, name: 'Control', value: '8' },
        { id: 5, name: 'Stamina', value: '6' },
      ],
      properties: [
        { id: 1, name: 'Appearance', value: 'Sleek silver water scooter and blue outfit.' },
        { id: 2, name: 'Signature Trick', value: 'Wave Whirl' },
        { id: 3, name: 'Team Affiliation', value: 'Blue Barracudas' },
        {
          id: 4,
          name: 'Special Ability',
          value: "Surf's Up: Boosts speed when riding on large waves.",
        },
        { id: 5, name: 'Home Wave', value: 'Barracuda Bay' },
      ],
    },
    {
      id: 2,
      name: 'Aqua Striker',
      description: 'A powerful player with an unyielding spirit.',
      attributes: [
        { id: 1, name: 'Speed', value: '5' },
        { id: 2, name: 'Agility', value: '6' },
        { id: 3, name: 'Strength', value: '9' },
        { id: 4, name: 'Control', value: '7' },
        { id: 5, name: 'Stamina', value: '8' },
      ],
      properties: [
        { id: 1, name: 'Appearance', value: 'Bright orange water scooter with a matching outfit.' },
        { id: 2, name: 'Signature Trick', value: 'Aqua Hammer' },
        { id: 3, name: 'Team Affiliation', value: 'Orange Octopuses' },
        {
          id: 4,
          name: 'Special Ability',
          value: 'Tidal Strength: Increases shot power in high tides.',
        },
        { id: 5, name: 'Home Wave', value: 'Octopus Oasis' },
      ],
    },
    {
      id: 3,
      name: 'Sea Spirit',
      description: 'A player who is one with the sea and moves like a spirit.',
      attributes: [
        { id: 1, name: 'Speed', value: '8' },
        { id: 2, name: 'Agility', value: '7' },
        { id: 3, name: 'Strength', value: '6' },
        { id: 4, name: 'Control', value: '9' },
        { id: 5, name: 'Stamina', value: '6' },
      ],
      properties: [
        {
          id: 1,
          name: 'Appearance',
          value: 'Mystical blue water scooter with a white and green outfit.',
        },
        { id: 2, name: 'Signature Trick', value: 'Spiral Splash' },
        { id: 3, name: 'Team Affiliation', value: 'Green Gulls' },
        {
          id: 4,
          name: 'Special Ability',
          value: 'Spirit Glide: Can glide over the water surface for a short time.',
        },
        { id: 5, name: 'Home Wave', value: "Gull's Grove" },
      ],
    },
    {
      id: 4,
      name: 'Tide Twister',
      description: 'A player who uses the power of the tides tohis advantage.',
      attributes: [
        { id: 1, name: 'Speed', value: '6' },
        { id: 2, name: 'Agility', value: '8' },
        { id: 3, name: 'Strength', value: '7' },
        { id: 4, name: 'Control', value: '6' },
        { id: 5, name: 'Stamina', value: '9' },
      ],
      properties: [
        { id: 1, name: 'Appearance', value: 'A vibrant red water scooter and outfit.' },
        { id: 2, name: 'Signature Trick', value: 'Tide Twirl' },
        { id: 3, name: 'Team Affiliation', value: 'Red Rays' },
        {
          id: 4,
          name: 'Special Ability',
          value: 'Tidal Wave: Can create a small wave to disrupt opponents.',
        },
        { id: 5, name: 'Home Wave', value: "Ray's Reef" },
      ],
    },
    {
      id: 5,
      name: 'Ocean Oracle',
      description: 'A player with unparalleled understanding of the sea and the game.',
      attributes: [
        { id: 1, name: 'Speed', value: '7' },
        { id: 2, name: 'Agility', value: '6' },
        { id: 3, name: 'Strength', value: '8' },
        { id: 4, name: 'Control', value: '9' },
        { id: 5, name: 'Stamina', value: '7' },
      ],
      properties: [
        { id: 1, name: 'Appearance', value: 'A golden water scooter with a purple outfit.' },
        { id: 2, name: 'Signature Trick', value: 'Oracle Ovation' },
        { id: 3, name: 'Team Affiliation', value: 'Purple Puffers' },
        {
          id: 4,
          name: 'Special Ability',
          value: "Oracle's Insight: Can predict the path of the ball for a short time.",
        },
        { id: 5, name: 'Home Wave', value: "Puffer's Pond" },
      ],
    },
  ],
}

const collection5 = {
  id: 2,
  name: 'Wave Strikers 2',
  description:
    'A sequel to the popular game Wave Strikers, featuring new mini football players, water scooters, and footballs. Players can now compete in online multiplayer matches against other players from around the world.',
  categories: ['Mini Football Players', 'Water Scooters', 'Footballs'],
  attributes: [
    {
      id: 1,
      name: 'Speed',
      min: 1,
      max: 10,
      description: 'The speed of the water scooter.',
    },
    {
      id: 2,
      name: 'Agility',
      min: 1,
      max: 10,
      description: 'The agility of the water scooter.',
    },
    {
      id: 3,
      name: 'Durability',
      min: 1,
      max: 10,
      description: 'The durability of the water scooter.',
    },
    {
      id: 4,
      name: 'Maneuverability',
      min: 1,
      max: 10,
      description: 'The maneuverability of the water scooter.',
    },
    {
      id: 5,
      name: 'Power',
      min: 1,
      max: 10,
      description: 'The power of the water scooter.',
    },
  ],
  properties: [
    {
      id: 1,
      name: 'Color',
      description: 'The color of the water scooter.',
    },
    {
      id: 2,
      name: 'Design',
      description: 'The design of the water scooter.',
    },
    {
      id: 3,
      name: 'Brand',
      description: 'The brand of the water scooter.',
    },
    {
      id: 4,
      name: 'Model',
      description: 'The model of the water scooter.',
    },
    {
      id: 5,
      name: 'Year',
      description: 'The year of the water scooter.',
    },
  ],
  assets: [
    {
      id: 1,
      name: 'Mini Football Player',
      description: 'A mini football player that can ride a water scooter.',
      attributes: [
        {
          id: 1,
          name: 'Speed',
          value: 5,
        },
        {
          id: 2,
          name: 'Agility',
          value: 7,
        },
        {
          id: 3,
          name: 'Durability',
          value: 8,
        },
        {
          id: 4,
          name: 'Maneuverability',
          value: 9,
        },
        {
          id: 5,
          name: 'Power',
          value: 6,
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Color',
          value: 'Red',
        },
        {
          id: 2,
          name: 'Design',
          value: 'Classic',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Air Max',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
    },
    {
      id: 2,
      name: 'Water Scooter',
      description: 'A high-tech water scooter that can be used to play football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Speed',
          value: 8,
        },
        {
          id: 2,
          name: 'Agility',
          value: 6,
        },
        {
          id: 3,
          name: 'Durability',
          value: 9,
        },
        {
          id: 4,
          name: 'Maneuverability',
          value: 7,
        },
        {
          id: 5,
          name: 'Power',
          value: 10,
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Color',
          value: 'Blue',
        },
        {
          id: 2,
          name: 'Design',
          value: 'Modern',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Honda',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Jet Ski',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
    },
    {
      id: 3,
      name: 'Football',
      description: 'A football that can be used to play football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: '12',
        },
        {
          id: 2,
          name: 'Weight',
          value: '14 ounces',
        },
        {
          id: 3,
          name: 'Material',
          value: 'Rubber',
        },
        {
          id: 4,
          name: 'Color',
          value: 'White',
        },
        {
          id: 5,
          name: 'Brand',
          value: 'Nike',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Classic',
        },
      ],
    },
    {
      id: 4,
      name: 'Goal',
      description: 'A goal that can be used to score goals in football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Height',
          value: '8 feet',
        },
        {
          id: 2,
          name: 'Width',
          value: '6 feet',
        },
        {
          id: 3,
          name: 'Material',
          value: 'Plastic',
        },
        {
          id: 4,
          name: 'Color',
          value: 'Blue',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Modern',
        },
      ],
    },
    {
      id: 5,
      name: 'T-Shirt',
      description: 'A t-shirt that can be worn by players while playing football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: 'Medium',
        },
        {
          id: 2,
          name: 'Color',
          value: 'Red',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Classic',
        },
      ],
    },
    {
      id: 6,
      name: 'Football Helmet',
      description:
        'A football helmet that can protect players from head injuries while playing football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: 'Medium',
        },
        {
          id: 2,
          name: 'Color',
          value: 'Blue',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Air Max',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Modern',
        },
        {
          id: 2,
          name: 'Material',
          value: 'Carbon Fiber',
        },
        {
          id: 3,
          name: 'Weight',
          value: '2 pounds',
        },
        {
          id: 4,
          name: 'Protection',
          value: '5 stars',
        },
      ],
    },
    {
      id: 7,
      name: 'Football Cleats',
      description:
        'Football cleats that can help players grip the surface of the water while playing football.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: 'Medium',
        },
        {
          id: 2,
          name: 'Color',
          value: 'Black',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Air Max',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Classic',
        },
        {
          id: 2,
          name: 'Material',
          value: 'Rubber',
        },
        {
          id: 3,
          name: 'Grip',
          value: '5 stars',
        },
      ],
    },
    {
      id: 8,
      name: 'Football Gloves',
      description:
        'Football gloves that can help players grip the football while playing football on the water.',
      attributes: [
        {
          id: 1,
          name: 'Size',
          value: 'Medium',
        },
        {
          id: 2,
          name: 'Color',
          value: 'Black',
        },
        {
          id: 3,
          name: 'Brand',
          value: 'Nike',
        },
        {
          id: 4,
          name: 'Model',
          value: 'Air Max',
        },
        {
          id: 5,
          name: 'Year',
          value: '2023',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Design',
          value: 'Classic',
        },
        {
          id: 2,
          name: 'Material',
          value: 'Leather',
        },
        {
          id: 3,
          name: 'Grip',
          value: '5 stars',
        },
      ],
    },
  ],
}

const testCollections = [collection2, collection2, collection3, collection4, collection5]

const testRewardsAchievements = {
  rewards: [
    {
      id: 1,
      name: 'Speed Boost',
      description: 'Increase your spaceship speed by 10% for 30 minutes.',
      type: 'attributes changed',
    },
    {
      id: 2,
      name: 'Resource Pack',
      description: 'Receive special resources to upgrade your spaceship.',
      type: 'new assets',
    },
    {
      id: 3,
      name: 'Token Bonus',
      description: 'Earn 100 in-game tokens for trading and buying items.',
      type: 'new currencies',
    },
    {
      id: 4,
      name: 'Shield Upgrade',
      description: "Increase your spaceship's shield capacity by 20%.",
      type: 'attributes changed',
    },
    {
      id: 5,
      name: 'Exclusive Skin',
      description: 'Unlock a limited edition spaceship skin.',
      type: 'new assets',
    },
  ],
  achievements: [
    {
      id: 1,
      name: 'Rookie Pilot',
      description: 'Complete the tutorial.',
      trigger: 'Finish the introductory mission.',
      rewards: [
        {
          id: 1,
          name: 'Speed Boost',
          description: 'Increase your spaceship speed by 10% for 30 minutes.',
          type: 'attributes changed',
        },
        {
          id: 3,
          name: 'Token Bonus',
          description: 'Earn 100 in-game tokens for trading and buying items.',
          type: 'new currencies',
        },
      ],
    },
    {
      id: 2,
      name: 'First Victory',
      description: 'Win your first battle.',
      trigger: 'Defeat an enemy spaceship.',
      rewards: [
        {
          id: 2,
          name: 'Resource Pack',
          description: 'Receive special resources to upgrade your spaceship.',
          type: 'new assets',
        },
        {
          id: 4,
          name: 'Shield Upgrade',
          description: "Increase your spaceship's shield capacity by 20%.",
          type: 'attributes changed',
        },
      ],
    },
    {
      id: 3,
      name: 'Explorer',
      description: 'Discover 10 new planets.',
      trigger: 'Visit 10 different planets in the game.',
      rewards: [
        {
          id: 3,
          name: 'Token Bonus',
          description: 'Earn 100 in-game tokens for trading and buying items.',
          type: 'new currencies',
        },
        {
          id: 5,
          name: 'Exclusive Skin',
          description: 'Unlock a limited edition spaceship skin.',
          type: 'new assets',
        },
      ],
    },
    {
      id: 4,
      name: 'Trader',
      description: 'Complete 5 successful trades.',
      trigger: 'Participate in 5 trades with other players.',
      rewards: [
        {
          id: 1,
          name: 'Speed Boost',
          description: 'Increase your spaceship speed by 10% for 30 minutes.',
          type: 'attributes changed',
        },
        {
          id: 2,
          name: 'Resource Pack',
          description: 'Receive special resources to upgrade your spaceship.',
          type: 'new assets',
        },
      ],
    },
    {
      id: 5,
      name: 'Battle Master',
      description: 'Achieve 50 battle victories.',
      trigger: 'Win 50 battles against enemy spaceships.',
      rewards: [
        {
          id: 4,
          name: 'Shield Upgrade',
          description: "Increase your spaceship's shield capacity by 20%.",
          type: 'attributes changed',
        },
        {
          id: 5,
          name: 'Exclusive Skin',
          description: 'Unlock a limited edition spaceship skin.',
          type: 'new assets',
        },
      ],
    },
  ],
}

export const testJSON = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return {
    collection: testCollections[random(0, 4)],
  }
}
export const testRewardsAchievementsJSON = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return testRewardsAchievements
}

export const simulateConfirmAI = async (text: string, input: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    input.includes('yes') ||
    input.includes('y') ||
    input.includes('yeah') ||
    input.includes('yep') ||
    input.includes('sure') ||
    input.includes('ok') ||
    input.includes('okay') ||
    input.includes('alright') ||
    input.includes('fine') ||
    input.includes('confirm') ||
    input.includes('affirmative')
  )
}
