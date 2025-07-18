import css from "./SearchBox.module.css"
import type { DebouncedState } from "use-debounce"

interface SearchBoxProps{
    value: string,
    onSearch: DebouncedState<(newSerchQuery: string) => void>
}
export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  onSearch(event.target.value)
}

    return <>
    <input
  className={css.input}
  type="text"
  placeholder="Search notes"
  defaultValue={value}
  onChange={handleChange}
 />


    </>
  }