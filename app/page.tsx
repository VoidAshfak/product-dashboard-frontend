import { redirect } from "next/navigation";

export default function Home() {
  redirect('/products')
  return (
    <div>
      <main>
        {/* <div className="container mx-auto py-10 px-10">
            <Products />
        </div> */}

      </main>
    </div>
  );
}

