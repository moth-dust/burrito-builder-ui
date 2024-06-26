import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([])

  async function newOrder(name, ingredients){
    const newOrder = {
      id: orders.length + 1,
      name,
      ingredients
    }
    try {
      const postedOrder = await postOrder(newOrder)
      const newOrders = [...orders, postedOrder]
      setOrders(newOrders)
    } catch (error) {
      console.error(error)
    }
  }

  async function loadData(){
    try{
    const data = await getOrders();
    setOrders(data.orders)
    } catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  },[]);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm newOrder={newOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
