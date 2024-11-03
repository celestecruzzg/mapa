import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from 'react';

function ExampleMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const myMap = useRef<Map | null>(null);
    const [coordinates, setCoordinates] = useState<{lng:number, lat:number} | null> (null)

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiY2VsZXN0ZWNydXp6ZyIsImEiOiJjbTI5MDluYW4wMDloMmxweWIwc3oxcDl3In0.UtROlXtGKA46QV57BFnqAQ"; // Access token

        const universidades = [
            {
            nombre: "Universidad Tecnológica de Cancún",
            lng: -86.84698955779508,
            lat: 21.05063171668191,
            color: "Blue"
            },
            {
                nombre: "Instituto Tecnológico de Cancún",
                lng: -86.83550222990102,
                lat: 21.13844629021426
            },
            {
                nombre: "UQROO",
                lng: -86.92756061754885,
                lat: 21.16038991311494
            },
            {
                nombre: "Universidad del Caribe",
                lng: -86.82345580405372,
                lat: 21.200336961432924
            }
            ];
        
        

        if (mapContainer.current) {
            myMap.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", //checar más estilos en la documentación
                center: [-86.83895227875018, 21.04877572380671], 
                zoom: 15,
            });

            //método para obtener las coordenadas de una ubicación
            myMap.current.on("click", (e) =>{
                const {lng,lat} = e.lngLat
                setCoordinates({lng,lat})
                console.log(coordinates);
            }
            )
        }
        universidades.forEach((universidad) => {
            const marker = new mapboxgl.Marker({color:'purple'})
            .setLngLat([universidad.lng, universidad.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${universidad.nombre}</h3>`))
            .addTo(myMap.current);
            console.log(`Marcador agregado: ${universidad.nombre}`);
        });
    

        return () => {
            if (myMap.current) {
                myMap.current.remove();
            }
        };
    }, []); // useEffect vacío para que solo se ejecute una vez y no sea un loop interminable

    return (
        <div ref={mapContainer} style={{ position: "absolute", top: 0, bottom: 0, width: "100%", height: "100%" }} />
    );
}

export default ExampleMap