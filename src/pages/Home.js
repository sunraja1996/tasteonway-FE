import React, { useEffect, useState } from "react";
import PizzaBurger from "../Components/PizzaBurger";
import axios from "axios";
import { env } from "../environment";
import Loading from "../Components/Loading";
import Error from "../Components/Error";


function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const res = await axios.get(
          `${env.apiurl}/pizzaburgers/getallpizzaburgers`
        );
        setPizzas(res.data.pizzaburger);
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
          <div className="row justify-conten-centert">
            {pizzas.map((pizzaburger) => {
              return (
                <div className="col-md-4 p-3" key={pizzaburger._id}>
                  <div className="m-3">
                    <PizzaBurger pizzaburger={pizzaburger} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
