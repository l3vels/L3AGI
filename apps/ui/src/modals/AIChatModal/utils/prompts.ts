export const gameIdeaPrompt = (
  userInput: string,
  category: string,
  amount: number,
  format: string,
  chars: number,
) => {
  return `Generate ${amount} "ideas" for a <tag>${userInput}</tag> game; the game category is ${category}.
  Output as ${format}:
  { "ideas": [
      {
          "id": "1",
          "name": "game name",
          "description": "game description"
      }
  ]}
  
  General rules:
  1. Output should be in ${format} format.
  2. That is keywords for my game: <tag>${userInput}</tag> and category: <tag>${category}</tag>.
  3. For ideas.Description, use at most ${chars} characters.
  `
}

// export const gameIdeaParse = (content: string) => {}

export const gameplayPrompt = (
  gameName: string,
  gameIdea: string,
  amount: number,
  format: string,
  chars: number,
) => {
  return `Generate ${amount} "Gameplay" for that game.
  Output as ${format}:
  {gameplays: [
      {
          id: 1,
          description: "game description", // (Rules: Use at most ${chars} characters)
      }
  ]}
  
  General rules:
  1. Output should be in ${format} format
  2. Gameplay must be based on this game name: <tag>${gameName}</tag> and idea: <tag>${gameIdea}</tag>
  `
}

export const collectionPrompt = (
  gameName: string,
  gameIdea: string,
  gameplay: string,
  amount: number,
  format: string,
  attributesChars: number,
  propertiesChars: number,
  collectionChars: number,
  assetChars: number,
  amountAssets: number,
  amountAttributes: number,
  amountProperties: number,
) => {
  return `Generate a collection of assets, or collectibles that game "${gameName}" should have.
    we have four objects:
    - collection: "Generate a collection of assets, or collectibles that this game should have"
    - attributes: "Those are the variables that define the characteristics of an asset"
    - properties: "Those are variables that define the appearance of an asset"
    - assets: "Those are the assets, or collectibles that this game should have"
    Output as ${format}:
    {
        "collection": {
            "id": 1,
            "name": "collection name",
            "description": "collection description", // (Rules: Use at most ${collectionChars} characters)
            "categories": ["category 1", "category 2"], // (Rules: Build specific collection "categories", which are variables that define asset characteristics)
            "attributes": // (Rules: Build specific collection "attributes", which are variables that define asset characteristics)
            [{
                "id": 1,
                "name": "attribute title",
                "min": "min vale of range",
                "max": "max value of range",
                "description": "attribute description", // (Rules: Use at most ${attributesChars} characters)
            }],
            "properties": (Rules: Build specific collection "properties" that define the appearance of an asset)
            [{
                "id: 1,
                "name": "property title",
                "description": "property description", // (Rules: Use at most ${propertiesChars} characters)
            }],
            "assets": [{
                "id: 1,
                "name": "asset title",
                "description": "asset story", // (Rules: Use at most ${assetChars} characters),
                "attributes": [{
                    id: 1,
                    name: "attribute title",
                    value: "30", // (Rules: Should be balanced between the assets to have a better gameplay experience)
                }],
                "properties": [{
                    "id": 1,
                    "name": "property title",
                    "value": "Text", // (Rules: Should be balanced between the assets to have a better gameplay experience),
                }],
            }]
        },
    }

    General rules:
    1. Output should be in ${format} format and provide full output
    2. The <tag>attributes</tag> should be balanced between the "assets" to have a better gameplay experience
    3. The <tag>properties</tag>> should be balanced between the "assets" to have a better gameplay experience
    4. Generate ${amountAssets} <tag>collection"s assets</tag>.
    5. Generate ${amountAttributes} <tag>collection"s attributes</tag>.
    6. Generate ${amountProperties} <tag>collection"s properties</tag>.
    5. All this should be based on this game idea: <tag>${gameIdea}</tag> and gameplay: <tag>${gameplay}</tag>
    `
}
export const assetPrompt = (
  gameName: string,
  gameIdea: string,
  gameplay: string,
  amount: number,
  format: string,
  attributesChars: number,
  propertiesChars: number,
  collectionChars: number,
  assetChars: number,
  amountAssets: number,
  amountAttributes: number,
  amountProperties: number,
) => {
  return `Generate a collection of assets, or collectibles that game "${gameName}" should have.
    we have four objects:
    - collection: "Generate a collection of assets, or collectibles that this game should have"
    - attributes: "Those are the variables that define the characteristics of an asset"
    - properties: "Those are variables that define the appearance of an asset"
    - assets: "Those are the assets, or collectibles that this game should have"
    Output as ${format}:
    {
        collection: {
            id: 1,
            name: "collection name",
            description: "collection description", // (Rules: Use at most ${collectionChars} characters)
            categories: ["category 1", "category 2"], // (Rules: Build specific collection "categories", which are variables that define asset characteristics)
            attributes: // (Rules: Build specific collection "attributes", which are variables that define asset characteristics)
            [{
                id: 1,
                name: "attribute title",
                min: "min vale of range",
                max: "max value of range",
                description: "attribute description", // (Rules: Use at most ${attributesChars} characters)
            }],
            properties: (Rules: Build specific collection "properties" that define the appearance of an asset)
            [{
                id: 1,
                name: "property title",
                description: "property description", // (Rules: Use at most ${propertiesChars} characters)
            }],
            assets: [{
                id: 1,
                name: "asset title",
                description: "asset story", // (Rules: Use at most ${assetChars} characters),
                attributes: [{
                    id: 1,
                    name: "attribute title",
                    value: "30", // (Rules: Should be balanced between the assets to have a better gameplay experience)
                }],
                properties: [{
                    id: 1,
                    name: "property title",
                    value: "Text", // (Rules: Should be balanced between the assets to have a better gameplay experience),
                }],
            }]
        },
    }

    General rules:
    1. Output should be in ${format} format and provide full output
    2. The <tag>attributes</tag> should be balanced between the "assets" to have a better gameplay experience
    3. The <tag>properties</tag>> should be balanced between the "assets" to have a better gameplay experience
    4. Generate ${amountAssets} <tag>collection"s assets</tag>.
    5. Generate ${amountAttributes} <tag>collection"s attributes</tag>.
    6. Generate ${amountProperties} <tag>collection"s properties</tag>.
    5. All this should be based on this game idea: <tag>${gameIdea}</tag> and gameplay: <tag>${gameplay}</tag>
    `
}

export const attributePropertyPrompt = (
  gameName: string,
  gameIdea: string,
  gameplay: string,
  amount: number,
  format: string,
  attributesChars: number,
  propertiesChars: number,
  collectionChars: number,
  assetChars: number,
  amountAssets: number,
  amountAttributes: number,
  amountProperties: number,
  collections: JSON[],
) => {
  return `Generate ${amountAttributes} of attributes for each collection which I"ll provide above, that game "${gameName}" should have.
    we have four objects:
    - collection: "Generate a collection of assets, or collectibles that this game should have"
    - attributes: "Those are the variables that define the characteristics of an asset"
    - properties: "Those are variables that define the appearance of an asset"
    - assets: "Those are the assets, or collectibles that this game should have"
    Output as ${format}:
    {
        attributes: // (Rules: Build specific collection "attributes", which are variables that define asset characteristics)
        [{
            id: 1,
            name: "attribute title",
            min: "min vale of range",
            max: "max value of range",
            description: "attribute description", // (Rules: Use at most ${attributesChars} characters)
            collection_id: 1,
        }],
        properties: (Rules: Build specific collection "properties" that define the appearance of an asset)
        [{
            id: 1,
            name: "property title",
            description: "property description", // (Rules: Use at most ${propertiesChars} characters),
            collection_id: 1,
        }],
    }

    General rules:
    1. Output should be in ${format} format and provide full output
    2. The <tag>attributes</tag> should be balanced between the "assets" to have a better gameplay experience
    3. The <tag>properties</tag>> should be balanced between the "assets" to have a better gameplay experience
    5. Generate ${amountAttributes} <tag>collection"s attributes</tag>.
    6. Generate ${amountProperties} <tag>collection"s properties</tag>.
    7. All this should be based on this game idea: <tag>${gameIdea}</tag> and gameplay: <tag>${gameplay}</tag>
    8. Here is Collection"s JSON data: <tag>${JSON.stringify(
      collections,
    )}</tag>, That properties and attributes should be based on this collection data.
    `
}

// export const collectionPrompt = (
//   gameName: string,
//   gameIdea: string,
//   gameplay: string,
//   amount: number,
//   format: string,
//   attributesChars: number,
//   propertiesChars: number,
//   collectionChars: number,
//   assetChars: number,
//   amountAssets: number,
//   amountAttributes: number,
//   amountProperties: number,
// ) => {
//   return `Generate {amount} collection of assets, or collectibles that game "${gameName}" should have.
//     we have four objects:
//     - collections: "Generate a collection of assets, or collectibles that this game should have"
//     Output as ${format}:
//     {
//         collections: [{
//             id: 1,
//             name: "collection name",
//             description: "collection description", // (Rules: Use at most ${collectionChars} characters)
//             categories: ["category 1", "category 2"], // (Rules: Build specific collection "categories", which are variables that define asset characteristics)
//       }],
//     }

//     General rules:
//     1. Output must be in only ${format} format, without any additional text.
//     5. All this should be based on this game idea: <tag>${gameIdea}</tag> and gameplay: <tag>${gameplay}</tag>
//     `
// }

export const rewardAchievementPrompt = (
  gameName: string,
  gameIdea: string,
  gameplay: string,
  amountReward: 5,
  amountAchievement: 5,
  format: string,
  achievementChars: 80,
  rewardChars: 80,
) => {
  return `Generate ${amountReward} amount Reward and  ${amountAchievement} amount Achievement should that game "${gameName}" should have:
  {
    rewards: [{
        id: 1,
        name: "reward title",
        description: "reward description", // (Rules: Use at most ${rewardChars} characters),
        type: "attributes changed", // (Rules: which can be “attributes changed”, “new assets”, or “new currencies”. Use the Attributes and “Assets tables” defined previously to define the types of attributes changed or new assets that can be awarded.)
    }],
    achievements: [{
        id: 1,
        name: "achievement title",
        description: "achievement description", // (Rules: Use at most ${achievementChars} characters),
        trigger: "achievement trigger", // (Rules: please explain the logic required to unlock this achievement, max 100 characters)
        rewards: //(Rule: for completing the achievement, the player can get 2-3 rewards per achievement,  using the “rewards” table,  the achievement can also be awarded by reaching new levels or XP)
        [{
            id: 1,
            name: "reward title",
            description: "reward description", // (Rules: Use at most ${rewardChars} characters),
            type: "attributes changed", // (Rules: which can be “attributes changed”, “new assets”, or “new currencies”. Use the Attributes and “Assets tables” defined previously to define the types of attributes changed or new assets that can be awarded.)
        }],
    }],

  }
  _____
  General rules:
  1. Output should be in ${format} format
  2. We can draw inspiration from achievements and rewards in web3 games.
  3. Generate 5 records for each table
  4. You can use “Asset Table” from here: “**Collection 1: Spaceship Modules**
  5. All this should be based on this game idea: "${gameIdea}" and gameplay: "${gameplay}"`
}

export const reportPlayerPrompt = (players: string[]) => {
  return `Following json array represents player signup dates:
  "
  [ "2023-04-24T22:29:33.407Z", "2023-05-02T23:01:40.793Z", "2023-05-05T16:54:05.523Z", "2023-05-05T16:57:57.191Z", "2023-05-05T17:03:31.519Z", "2023-05-05T17:06:30.126Z" ]
  "
  Group player signup dates by months and produce JSON output exactly as this:
  """
  [{
  
  }]
  """
  Generate recharts reactjs data code. `
}

export const questionConfirmPrompt = (question: string, answer: string) => {
  return `My question to the user is: <tag>${question}<tag/>

  User"s answer is: <tag>${answer}</tag>
  
  General Rules:
  If the user"s answer is confirmed, my question output must be "Yes" or "No".
  Please, ChatGPT, don"t add any other content to your response.`
}

export const parseEmbeddedJson = (str: string): object | null => {
  // Find JSON part using a RegEx
  const match = str.match(/\{.*\}/)
  if (match === null) {
    console.error('No JSON found in the provided string.')
    return null
  }

  let jsonPart = match[0]

  // Correct JSON syntax
  jsonPart = jsonPart.replace(/(\w+):/g, '"$1":') // Adds double quotes around keys

  // Parse JSON
  let jsonObj: object | null = null
  try {
    jsonObj = JSON.parse(jsonPart)
  } catch (e) {
    console.error('Parsing error:', e)
    return null
  }

  return jsonObj
}
;``
export const parseGPTContent = (content: string) => {
  const start = content.indexOf('```json') + '```json'.length
  const end = content.lastIndexOf('```')
  const jsonString = content.substring(start, end).trim()

  try {
    console.log(jsonString, 'parseGPTContent')
    const data = JSON.parse(jsonString)
    return data
  } catch (e) {
    try {
      const json = parseEmbeddedJson(content)
      if (json) return json
      const data = JSON.parse(content.trim())
      return data
    } catch (e) {
      console.log(e, 'JSON Parse 2')
    }
    console.log(e, 'JSON Parse 1')
    return null
  }
}
