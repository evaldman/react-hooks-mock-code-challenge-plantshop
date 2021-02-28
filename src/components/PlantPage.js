import React, {useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({plants, setPlants}) {
  const [search, setSearch] = useState("")

  // console.log(plants)

  return (
    <main>
      <NewPlantForm plants={plants} setPlants={setPlants}/>
      <Search search={search} setSearch={setSearch}/>
      <PlantList plants={plants.filter((plant) => plant.name.toLowerCase().includes(search.toLowerCase()))} setPlants={setPlants}/>
    </main>
  );
}

export default PlantPage;
