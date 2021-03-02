import React, {useState} from "react";

function PlantCard({image, name, price, id, setPlants, plants}) {

  const [inStock, setInStock] = useState(true)
  const [newPrice, setNewPrice] = useState("")

  function handleClick(){
    setInStock((inStock) => !inStock)
  }

  function handleDelete(){
    // console.log(id)
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    setPlants(plants.filter((plant) => plant.id !== id))
  }

  function handleNewPrice(e){
    // console.log({newPrice})
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({price: newPrice})
    })
      .then(response => response.json())
      .then(priceData => {
        const updatedPrice = plants.map((plant) => {
          if (plant.id === priceData.id) {
            return priceData
          } else {
              return plant
          }
        })
        setPlants(updatedPrice)
        setNewPrice("")
      })
      
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete} >Delete</button>
      <form onSubmit={handleNewPrice}>
        <input type="number" step="0.01" placeholder="enter new price" value={newPrice} onChange={(e) => setNewPrice(parseFloat(e.target.value))}/>
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
