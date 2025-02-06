import { useState } from 'react';

export default function useCoustom01State(){
    const [state, setState] = useState({
        online:[],
        market:[],
        subName:'sub7'
    });

    return{
        state,
        setState
    }
}