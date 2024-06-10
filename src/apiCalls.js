async function getOrders(){
  try{
  const response =  await fetch("http://localhost:3001/api/v1/orders")
  const data = await response.json()
  return data
  } catch (error){
    throw new Error(`Error fetching: ${error}`)
  }
}

export{getOrders}
