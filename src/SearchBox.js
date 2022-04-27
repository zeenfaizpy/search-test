import { useState, useEffect } from "react";

import axios from "axios";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const URL = "https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words";

function SearchBox() {
    const [ value, setValue ] = useState("");
    const [ data, setData ] = useState([]);
    const [ matchedWords, setMatchedWords ] = useState([]);

    const onChange = (value) => {
        setValue(value);
        let matchedWords = [];
        if(value.length >= 3){
            matchedWords = data.filter(word => {
                const regex = new RegExp(value, 'gi');
                return word.match(regex);
            });
            setMatchedWords(matchedWords);
        } else {
            setMatchedWords([]);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(URL);
            setData(response.data.split("\n"));
        }
        loadData();
    }, []);

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Mohammad Faizal
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} style={{textAlign:'center', 'marginTop': 10}}>
                    <div>
                        <TextField label="Search" variant="outlined" value={value} onChange={(e) => onChange(e.target.value)} />
                        <div>
                            {
                                matchedWords.map((word) => {
                                    return (
                                        <span key={word}>{
                                            word.split('').map((char) => {
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
                    </div>
                </Grid>
            </Grid>
      </>
    );
}
  
  export default SearchBox;