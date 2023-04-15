import React, { useEffect, useState } from "react";
import Products from "../Components/Products";
import axios from "axios";
import { env } from "../environment";
import Loading from "../Components/Loading";
import Error from "../Components/Error";



function AllProducts() {

    const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const res = await axios.get(
          `${env.apiurl}/pizzaburgers/getallpizzaburgers`
        );
        setProducts(res.data.pizzaburger);
        console.log(res.data.pizzaburger);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPizzas();
  }, []);

  return (
    <>
    {isLoading ? (
      <Loading/>
    )  : isError ? (
      <Error/>
    ) : (
      <div>
        <h1 style={{textAlign:"center"}}> All Products </h1>
        <div className="row justify-content-center">
          {products.map((allpro) => {
            return (
              <div key={allpro._id}>
                <div className="m-3">
                  <Products allpro={allpro} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </>
  )
}

export default AllProducts