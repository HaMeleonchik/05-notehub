import { useState } from "react"
import css from "./SearchBox.module.css"

interface SearchBoxProps{
    value: string,
    onSearch: (newSerchQuery: string) => void,
}
export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  
  const [defaultValue, setDefaultValue] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const NewValue = event.target.value
    setDefaultValue(NewValue)
    onSearch(NewValue)
}

    return <>
    <input
  className={css.input}
  type="text"
  placeholder="Search notes"
  value={defaultValue}
  onChange={handleChange}
 />
    </>
  }