import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://katona:gu8jVv9zyEnyzRpQ@cluster0.gjmgu.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((m) => ({
        title: m.title,
        address: m.address,
        image: m.image,
        id: m._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async (context) => {
//   const req = context.req
//   const res = context.res
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };
export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse lots of highly active React meetups."/>
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}
