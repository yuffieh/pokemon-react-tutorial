import React from 'react';
import { Radar } from 'react-chartjs';

const PokemonInfo = ({pokemon}) => {


  const labels = pokemon.stats.map ((info)=>{
    return info.stat.name;
  })
  const data = pokemon.stats.map((info)=>{
     return info.base_stat;
  })


  let chartData = {
    labels: labels,
    datasets: [
      {
      data:data,
      fillColor: "rgba(255,9,132,0.2)",
      strokeColor: "rgba(255,99,132,1)",
      pointColor: "rgba(255, 99, 132,1)",
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: "rgba(255,99,132,1)"
    }
  ]
  }

  return(
    <div>
      <img src={pokemon.sprites.front_default}/>
      <Radar data={chartData} width="300" height="250" />

    </div>
  )

}

export default PokemonInfo;
