import { axios } from 'axios'

const get = async () => {
  const res = await axios.get('/announcement')
  console.log(res)
}

get()
