import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './App.css'
import {Box, Slider} from "@mui/material";
import ToyPreview from './components/toy-preview/ToyPreview';

function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value,setValue] = useState('');
    const [order, setState] = useState([])

    const filterServices  = items.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })

    const [price, setPrice] = React.useState([0, 1000])

    const minDistance = 10;

     const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]])
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)])
        }
    }

    const marks = [
        {
            value: 0,
            label: '0 ₽',
        },
        {
            value: 250,
            label: '250 ₽',
        },
        {
            value: 500,
            label: '500 ₽',
        },
        {
            value: 750,
            label: '750 ₽',
        },
        {
            value: 1000,
            label: '1000 ₽',
        },
    ];

    function valuetext(price) {
        return `${price} Р`;
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/toys/`)
            .then (res => res.json())
            .then(

                (result) =>{
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) =>{
                    setIsLoaded(true);
                    setItems(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className='container-text'>
                {<div className="topnav">
                    <a className="active" href="src/Range#home"><Link to="/toys">Главная</Link></a>
                    <a href="src/Range#contact"><Link to="/toys">Контакты</Link></a>
                    <a href="src/Range#about"><Link to="/toys">Информация</Link></a>
                    <input
                        type="text"
                        placeholder="Поиск..."
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>}

                <div className="assortment">Каталог игрушек</div>

                <div className="mx-auto">
                    <Box sx={{width: 400}}>
                        <Slider
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            value={price}
                            onChange={handleChange}
                            marks={marks}
                            disableSwap
                            step={10}
                            min={0}
                            max={1000}
                        />
                    </Box>
                </div>
                <div className="toy-preview__container">
                    {filterServices.filter((item: { price: number }) => item.price >= price[0] && item.price <= price[1]).map((item => <ToyPreview toy={item} key={item.pk}/>))}
                </div>
            </div>
        );
    }
}
export default MyComponent;
