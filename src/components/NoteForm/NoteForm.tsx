import { useMutation, useQueryClient } from "@tanstack/react-query"
import css from "./NoteForm.module.css"
import { createNote } from "../../services/noteService"
import type { NewNote } from "../../types/note"
import { Formik, Form, Field, ErrorMessage} from 'formik';
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
interface NoteFormProps{
    onClose: () => void
}
export default function NoteForm({ onClose }: NoteFormProps) { 

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (taskData: NewNote) => createNote(taskData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"]})
    }
})

  
const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .required("Name is required"),
  content: Yup.string()
    .max(500, "Name is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("tag is required"),
});

  interface FormValues {
    title: string,
    content: string,
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
  }

  const formValues: FormValues = {
    title: "",
    content: "",
    tag:"Todo",
}

  const handleSubmit = ({ title, content, tag }: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    mutation.mutate({
    title,
    content,
    tag,
})
    onClose()
    formikHelpers.resetForm()
    }
  

  return <Formik initialValues={formValues} validationSchema={OrderFormSchema} onSubmit={handleSubmit}>
  <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field as="input" did="title" type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
      <Field
      as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" component="span" className={css.error} />
  </div>

  <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={false}
    >
      Create note
    </button>
  </div>
</Form>
 </Formik>
}