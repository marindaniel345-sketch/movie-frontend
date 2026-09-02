import { useState } from "react";
export function SearchBar({ onSearch }:SearchBarProps) {
    const [input,setInput ] = useState("");
    return (
        <div className="search-bar">
                <input className="input" type="text" value={input} onChange={(event) => {
    setInput(event.target.value);
    if(event.target.value === "") {
        onSearch("");
    }
}}/>
                <button className="search-button" onClick={()=> {
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