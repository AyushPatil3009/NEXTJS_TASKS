import { notFound } from "next/navigation";

const students = [
  { id: 1, name: "Jayesh", reward: 79999 },
  { id: 2, name: "Tushar", reward: 69999 },
  { id: 3, name: "Karan", reward: 59999 },
];

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const student = students.find((student) => student.id === Number(id));

  if (!student) {
    notFound();
  }

  return (
    <div>
      <h1>{student.name}</h1>
      <p>₹{student.reward}</p>
    </div>
  );
}