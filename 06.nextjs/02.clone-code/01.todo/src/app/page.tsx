import Image from "next/image";
import Link from "next/link";
import { prisma, Todo } from "./db";
import TodoItem from "./components/TodoItem";


async function createTodos() {
  await prisma.todo.create({data: {title: "Test1",complete: false}});
  await prisma.todo.create({data: {title: "Test2",complete: false}});
  await prisma.todo.create({data: {title: "Test3",complete: false}});
}

async function getTodos(): Promise<Todo[]> {
  const todos = await prisma.todo.findMany(); 
  return todos;
}

const Home: React.FC = async () => {
  // await createTodos();
  const todos:any = await getTodos();
  console.log(todos); // command 창에 리스트가 뜸 
  console.log("home page"); 

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded 
        hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo:Todo) => {
          return <TodoItem key={todo.id} {...todo} />
        })}
      </ul>
    </>
  );
}

export default Home;