import css from "./Modal.module.css"
import NoteForm from "../NoteForm/NoteForm";
import { useEffect } from "react";
interface ModalProps{
    onClose: () => void
}
export default function Modal({ onClose }: ModalProps) {

// Escape and fix
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
      onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow ="hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  // handleBackdropClick
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if(event.target === event.currentTarget) {
      onClose()
    }
  }


    return <div
  className={css.backdrop}
  role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
>
  <div className={css.modal}>
            <NoteForm onClose={onClose} />
  </div>
</div>

}