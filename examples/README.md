# merge-left-utils examples

I've crafted this package primarily to simplify work with graphql data. By default Apollo queries receives not only the data you requesting, but also it provides meta field `__typename`. 

When you want to use **mutation** you cannot pass object with __typename field, so you need to modify data before sending it as mutation variable.



## Example with React and Apollo
```javascript
// our state shape
const DEFAULT_STATE = {
  id: undefined,
  name: '',
  email: ''
}

// graphql query
const GQL_QUERY_FORM_DATA = gql`
query ($id: ID) {
  userForm (id: $id) {
    id
    name
    email
  }
}
`
// graphql mutation
const GQL_MUTATION_SUBMIT_FORM = gql`
# for example, lets assume this is our input type
# input InputFormData { 
#   id: Int
#   name: String!
#   email: String!
# }
mutation ($formData: InputFormData!) {
  submitForm (formData: $formData) {
    id
    name
    email
  }
}
`

export default function SomeComponent (props) {
  // setting default component state
  const [ state, setState ] = useState(DEFAULT_STATE)
  // request existing data
  const { data, loading } = useQuery(GQL_QUERY_FORM_DATA, {
    variables: {
      id: props.id
    },
    skip: !props.id
  })
  // prepare mutator function
  const [ submitForm ] = useMutation(GQL_MUTATION_SUBMIT_FORM)

  // loading existing data with gql
  useEffect(() => {
    if (data && !loading) {
      // because mergeLeft operates only with state fields
      // we can safely update our state without structural changes
      // e.g: here we omit __typename from query result
      // because mutation variables dont want to receive this property
      setState(state => mergeLeft(state, data.formData))
    }
  }, [ loading ])

  const handleFormChange = useCallback((event) => {
    // update field in state with mergeLeft
    setState(state => mergeLeft(state, { [event.target.name]: event.target.value }))
  }, [])

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    submitForm({
      variables: {
        // pass state as formData mutation variable
        formData: state
      }
    })
      .then(() => { /* ... */ })
      .catch(() => { /* ... */ })
  }, [ submitForm, state ])

  return <form onSubmit={ handleFormSubmit }>
    <input name="name" onChange={ handleFormChange } />
    <input name="email" onChange={ handleFormChange } />
    <button type="submit">Submit</button>
  </form>
}
```



## Using Typescript

You can set data type using generic type parameter

```typescript
interface IDataShape {
  id?: number
  name: string
  email: string
}
const DEFAULT_STATE: IDataShape = { /*... */ }

/* ...component code */
setState(state => mergeLeft<IDataShape>(state, data.formData))
```



