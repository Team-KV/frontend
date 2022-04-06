import { useState } from "react"

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues)

  const handleInput = (e: any) => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  return {
    values,
    setValues,
    handleInput
  }
}

export const Form = (props: any) => {
  return(
    <form onSubmit={props.onSubmit}>
      {props.children}
    </form>
  )
}
