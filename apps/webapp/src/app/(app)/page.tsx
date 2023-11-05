import Product from "@/components/product";
import { IProductAxios } from "@/interfaces";
import { axiosClient } from "@/lib/axios";

const Home = async () => {
  const { data }: IProductAxios = await axiosClient.get("/products/");

  return (
    <div className="max-w-[1200px] pt-10 mx-auto">
      <div className="grid grid-cols-4 gap-5">
        {data.data?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
