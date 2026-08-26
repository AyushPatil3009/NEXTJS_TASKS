import {cache} from "react"
// When we hit /random the default export are the function that render 
async function FunctionOne() {
  const data = await getData();
  return <h2>Total Users: {data.length}</h2>;
}

async function FunctionTwo() {
  const data = await getData();
  return (
    <div>
      <h2>User Data</h2>

      {data.map((user) => (
        <div key={user.name}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}

const getData = cache(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Fetching data...");

  return [
    { name: "Ayush", age: 21 },
    { name: "Rahul", age: 22 },
    { name: "Jay", age: 20 },
  ];
});


export default async function Page() {
  return (
    <>
      <FunctionOne />
      <FunctionTwo />
    </>
  );
}


// const list = async () => {
//   const x=await getData();
//   return(
//     <>
//     <h2>{x.name}</h2>
//     <p>{x.age}</p>
//     </>
//   )
// }
