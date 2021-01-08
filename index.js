/*
* There are six questions below. For every question, first do an implementation connecting to the Mongo collection
* followed by an implementation in native javascript manipulating the dataset object. Mongo documentation has been
* included in the questions as well.
*
* The dataset object is a json representation of the MongoDB database, besides the 'ownerId'.
* MongoDB Compass can be a great help for the aggregations.
* */

'use strict'
import mongoDB from 'mongodb';
import { dataset } from './dataset.js';
const { MongoClient } = mongoDB;

async function main() {
    /**
     * Connection URI. This should be present in the email that was sent with this assignment.
     */
    const uri = "mongodb+srv://tempUser:OUVxpaaTUob9jvMM@mars.9bbf5.mongodb.net/homework";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.3/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("homework");

        /*****************************************************************************************************
         *   Question One                                                                                    *
         *                                                                                                   *
         * Write a MongoDB query to display the total number of documents in the collection ships.           *
         * See https://docs.mongodb.com/manual/reference/method/db.collection.count/ for more details        *
         ****************************************************************************************************/

        //MongoDB
        //example: await database.collection("characters").count();
        database.ships.count();

        //Javascript
        //example: json.characters.length;
        let length = dataset.ships.length;
        /*****************************************************************************************************
         *   Question Two                                                                                    *
         *                                                                                                   *
         * Write a MongoDB query to display any 2 documents using pretty format in the collection ships.     *
         * See https://docs.mongodb.com/manual/reference/method/db.collection.find/ for more details.        *
         ****************************************************************************************************/

        //MongoDB
        database.ships.find().limit(2).pretty()

        //Javascript
        let random = dataset.ships.slice(1)

        /*****************************************************************************************************
         *   Question Three                                                                                  *
         *                                                                                                   *
         * Write a MongoDB query to display the details of the character with the most quotes.               *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ for more details         *
         ****************************************************************************************************/

        //MongoDB
        // database.characters.aggregate(
        //     [
        //         { $sort : {quotes : -1}}
        //     ]
        // )

        // sorting characters by most quotes in descending order and grabbing first one
        database.characters.find().sort( { "quotes": -1 } ).limit(1)

        //Javascript

        // setting two variables to track most quotes and the index of the character with the quotes, assuming 
        // first character has the most quotes
        let maxq = dataset.characters[0].quotes.length;
        let charIndex = 0;

        // for loop to determine if any other character has more quotes than the current one 
        for (i = 1; i < dataset.characters.length; i++){
            if (dataset.characters[i].quotes.length > maxq){
                maxq = dataset.characters[i].quotes.length;
                charIndex = i;
            }
        }
        // when the for loop finishes, charIndex should hold the index of the character with the most quotes
        // and mostQuotes will return an object of the character with the most quotes
        let mostQuotes = dataset.characters[charIndex]
        

        /*****************************************************************************************************
         *   Question Four                                                                                   *
         *                                                                                                   *
         * Write a MongoDB query to display any characters who have one of these personality traits:         *
         * “mature” or “lazy” in collection characters.                                                      *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/in/ for more details           *
         ****************************************************************************************************/

        //MongoDB
        database.characters.find( { personalityTraits: { $in: ["mature", "lazy"] } } );
        //Javascript
        let matureLazy = dataset.characters.filter(character => character.personalityTraits.includes("mature") || character.personalityTraits.includes("lazy"));

        /*****************************************************************************************************
         *   Question Five                                                                                   *
         *                                                                                                   *
         * Write a MongoDB query to display characters with a count of their quotes, and a count of their    *
         * personality traits.                                                                               *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/count/ for more details        *
         ****************************************************************************************************/

        //MongoDB
        // database.characters.aggregate(
        //     [
        //         {$match: {}},
        //         {$group: {_id: "$firstName", quotes: {$count: "$quotes"}, personalityTraits: {$count: "$personalityTraits"}}}
        //     ]
        // )

        // adding two new fields to each document in character collection: totalQuotes - how many quotes character has
        // totalTraits - how many personality traits a character has
        database.characters.aggregate(
            {
                $addFields: {
                    totalQuotes: {$size: "$quotes"},
                    totalTraits: {$size: "$personalityTraits"}
                }
            }
        )

        //Javascript
        // creating two new keys for each character
        // one for the length of their quotes and another key for the length of their personality traits
        for (char of dataset.characters){
            char["totalQuotes"] = char.quotes.length
            char["totalTraits"] = char.personalityTraits.length
        }

        /*****************************************************************************************************
         *   Question Six                                                                                    *
         *                                                                                                   *
         * Write a MongoDB query to display ships, joining the related character based on the ownerId.       *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/ for more details       *
         ****************************************************************************************************/

        //MongoDB
        database.ships.aggregate([
            {
                $lookup:
                {
                    from: 'characters',
                    localField: 'ownerId',
                    foreignField: '_id',
                    as: 'characters_ships'
                }
            }
        ])

        //Javascript
        // comparing ownerId field of ships to firstName field of characters.
        // if names match, join distinct fields from ships into corresponding character by creating a 
        // new array with an object containing the fields from characters collection.
        for (ship of dataset.ships){
            for (char of dataset.characters){
                if (ship.ownerId.split(' ')[0] === char.firstName){
                    ship['characters_ships'] = [
                        {'firstName': char.firstName, 'lastName': char.lastName, 'personalityTraits': char.personalityTraits, 'quotes':char.quotes}
                    ]
                }
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
