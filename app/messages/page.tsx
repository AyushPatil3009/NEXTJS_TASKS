import { getMessages } from "../data/getMessages";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <main>
      <h1>Messages</h1>

      {messages.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.message}</p>
        </div>
      ))}
    </main>
  );
}