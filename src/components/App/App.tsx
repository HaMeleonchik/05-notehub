import css from "./App.module.css"
import NoteList from "../NoteList/NoteList"
import { fetchNotes } from "../../services/noteService"
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import NoteForm from "../NoteForm/NoteForm";
import { useQuery, keepPreviousData} from '@tanstack/react-query';
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
export default function App() {
  const [query, setQuery] = useState("")
  const [isOpenModal, setOpenModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  })
  
  // const updateSerchQuery = useDebouncedCallback(setQuery,300)
  
  const updateSerchQuery = useDebouncedCallback(
    (newSerchQuery:string) => {
      setQuery(newSerchQuery)
      setCurrentPage(1)
    }, 300
  )

  const totalPages = data?.totalPages ?? 0;
  
  return <div className={css.app}>
	<header className={css.toolbar}>
      <SearchBox value={query} onSearch = { updateSerchQuery} />
    {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
		<button className={css.button} onClick={()=> setOpenModal(true)}>Create note + </button>
    </header>
    {data?.notes && data?.notes.length > 0 && <NoteList notes={data?.notes} />}
    {isLoading && <p className={css.loadingText}>Loading notes, please wait...</p>}
    {isError && <p className={css.errorText}>There was an error, please try again...</p>}
    {isOpenModal &&
    <Modal onClose={() => setOpenModal(false)}>
    <NoteForm onClose={ ()=> setOpenModal(false)} />
    </Modal>
    }
  </div>

}