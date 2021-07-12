import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

export default function NewMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async (meetup) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: {
        ContentType: "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.replace("/");
  };
  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta name="description" content="Add new meetup"/>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
