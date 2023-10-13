import Image from "next/image";
import { Inter } from "next/font/google";
import { wrapper } from "app/store";
import { setProductData } from "app/store/slices/product";
import { useDispatch, useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

function Home(props: any) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  console.log("product store", product);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Testing Redux Toolkit with Next13 SSR</h1>
      <div>
        {product.products.map((el) => {
          return (
            <div className="flex items-center justify-between">
              <h1>{el.title}</h1>
              <h1 className="text-green-500">{el.price}</h1>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      console.log("Store is empty now");

      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      await store.dispatch(setProductData(data));

      return {
        props: {
          query,
        },
      };
    }
);

export default Home;
