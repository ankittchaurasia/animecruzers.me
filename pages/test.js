import { useState, useEffect } from "react";


export default function Main() {
  
  useEffect(() => {
    fetch('https://animixplay.to/api/liveTWpZMU5RPT1MVFhzM0dyVTh3ZTlPVFdwWk1VNVJQVDA9')
  .catch((err) =>console.log(err));
  },[])

  return <h1>Hello</h1>;
}
