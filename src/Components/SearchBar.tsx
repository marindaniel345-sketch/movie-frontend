import { useState } from "react";
export function SearchBar({ onSearch }:SearchBarProps) {
    const [input,setInput ] = useState("");
    return (
        <div>
                <input type="text" value={input} onChange={(event) => {
    setInput(event.target.value);
}}/>
                <button onClick={()=> {
                    onSearch(input);
                }}>
                    Search
                    </button>
        </div>
    );
}
interface SearchBarProps {
    onSearch: (text: string) => void;
}