import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetails({ meetup }) {
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetail
        imgUrl={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </>
  );
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://katona:gu8jVv9zyEnyzRpQ@cluster0.gjmgu.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const ids = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: ids.map((m) => ({
      params: { meetupId: m._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://katona:gu8jVv9zyEnyzRpQ@cluster0.gjmgu.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  const { _id, ...meetupWithoutId } = meetup;
  return {
    props: {
      meetup: { ...meetupWithoutId, id: meetupId },
    },
  };
};
