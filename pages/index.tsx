import Head from "next/head";
import InputTodos from "../components/InputTodos";
import ListTodos from "../components/ListTodos";
import EditTodo from "../components/EditTodo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-5 grid place-items-center">
        <InputTodos />
        <ListTodos />
      </div>
    </>
  );
}
