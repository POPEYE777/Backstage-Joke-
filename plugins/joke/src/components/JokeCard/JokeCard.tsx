import React, { useState } from "react";
import { useAsync } from "react-use";
import { fetchApiRef, useApi } from "@backstage/core-plugin-api";

export const JokeCard = () => {
    const fetchApi = useApi(fetchApiRef);
    const [refreshKey, setRefreshKey] = useState(0); 

    const state = useAsync(async () => {
        const response = await fetchApi.fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'text/plain',
            }
        });

        const joke = await response.text();
        return joke;
    }, [refreshKey]); 
    
    const getNewJoke = () => {
        setRefreshKey(prevKey => prevKey + 1); 
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Joke of the Moment</h2>
            {state.loading
                ? <div>Loading...</div>
                : state.error
                    ? <div>Error: {state.error.message}</div>
                    : <div>{state.value}</div>
            }
            <button 
                onClick={getNewJoke}
                style={{
                    marginTop: '20px', 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Get Another Joke
            </button>
        </div>
    );
};
