import { MongoClient } from "mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect(
      "mongodb+srv://katona:gu8jVv9zyEnyzRpQ@cluster0.gjmgu.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    await meetupCollection.insertOne(data);
    client.close();
    res.status(201).json({message: 'Meetup inserted.'});
  }
};
