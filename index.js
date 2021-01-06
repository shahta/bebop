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
    const uri = "";

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

        //Javascript
        //example: json.characters.length;

        /*****************************************************************************************************
         *   Question Two                                                                                    *
         *                                                                                                   *
         * Write a MongoDB query to display any 5 documents using pretty format in the collection ships.     *
         * See https://docs.mongodb.com/manual/reference/method/db.collection.find/ for more details.        *
         ****************************************************************************************************/

        //MongoDB

        //Javascript

        /*****************************************************************************************************
         *   Question Three                                                                                  *
         *                                                                                                   *
         * Write a MongoDB query to display the details of the character with the most quotes.               *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ for more details         *
         ****************************************************************************************************/

        //MongoDB

        //Javascript

        /*****************************************************************************************************
         *   Question Four                                                                                   *
         *                                                                                                   *
         * Write a MongoDB query to display any characters who have one of these personality traits:         *
         * “mature” or “lazy” in collection characters.                                                      *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/in/ for more details           *
         ****************************************************************************************************/

        //MongoDB

        //Javascript

        /*****************************************************************************************************
         *   Question Five                                                                                   *
         *                                                                                                   *
         * Write a MongoDB query to display characters with a count of their quotes, and a count of their    *
         * personality traits.                                                                               *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/count/ for more details        *
         ****************************************************************************************************/

        //MongoDB

        //Javascript

        /*****************************************************************************************************
         *   Question Six                                                                                    *
         *                                                                                                   *
         * Write a MongoDB query to display ships, joining the related character based on the ownerId.       *
         * See https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/ for more details       *
         ****************************************************************************************************/

        //MongoDB

        //Javascript

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
