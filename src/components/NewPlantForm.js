import React, {useState} from "react";

function NewPlantForm({plants, setPlants}) {
  const [plantForm, setPlantForm] = useState({name: "", image: "", price: ""})

  function handleSubmit(e){
    e.preventDefault()
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify(plantForm)
      })
     .then(response => response.json())
     .then(plantData => {
       const newPlants = [...plants, plantData]
       setPlants(newPlants)
       setPlantForm({name: "", image: "", price: ""})
       
     
    })

  }

  function updateFormState(event){
    const updatedFormState = {...plantForm}
    updatedFormState[event.target.name] = event.target.name === "price" ? parseFloat(event.target.value) : event.target.value
    setPlantForm(updatedFormState)
    
  }
  // console.log(plantForm)

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={plantForm.name} onChange={updateFormState}/>
        <input type="text" name="image" placeholder="Image URL" value={plantForm.image} onChange={updateFormState}/>
        <input type="number" name="price" step="0.01" value={plantForm.price} placeholder="Price" onChange={updateFormState}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
