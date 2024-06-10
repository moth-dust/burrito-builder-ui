async function getOrders(){
  try{
  const response =  await fetch("http://localhost:3001/api/v1/orders")
  if(response.ok){
    const data = await response.json()
    return data
  } else {
    throw new Error(`Error fetching`)
  }
  } catch (error){
    throw new Error(`Error fetching: ${error}`)
  }
}
async function postOrder(order){
  try {
    const response = await fetch("http://localhost:3001/api/v1/orders",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });
    return response
  } catch (error) {
    throw new Error(`Error posting: ${error}`)
  }
}

export{getOrders, postOrder}
