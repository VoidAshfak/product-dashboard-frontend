// import { redirect } from "next/navigation";
import Products from "@/components/products/Products";

export default function Home() {
  // redirect('/products')
  return (
    <div>
      <main>
        <div className="container mx-auto py-10 px-10">
            <Products />
        </div>

      </main>
    </div>
  );
}

