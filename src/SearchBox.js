import axios from "axios";
import { useState, useEffect } from "react";

const URL = "https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words";

function SearchBox() {
    const [ value, setValue ] = useState("");
    const [ data, setData ] = useState("");
    const [ items, setItems ] = useState([]);

    const onChange = (value) => {
        setValue(value);
        let matchedWords = [];
        if(value.length >= 3){
            const words = data.split("\n");
            matchedWords = words.filter(word => {
                const regex = new RegExp(value, 'gi');
                return word.match(regex);
            });
            setItems(matchedWords);
        } else {
            setItems([]);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(URL);
            setData(response.data);
        }
        loadData();
    }, []);

    return (
        <>
            <h1>Mohammad Faizal</h1>
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
            <div>
                {
                    items.map((item) => {
                        return (
                            <span key={item}>{
                                item.split('').map((char) => {
                                    if (value.toLowerCase().split('').includes(char.toLowerCase())) {
                                      return <span style={{ color: '#FF0000' }}>{char}</span>;
                                    } else {
                                      return <span>{char}</span>;
                                    }
                                })
                            }<br /></span>
                        )
                    })
                }
            </div>
      </>
    );
}
  
  export default SearchBox;