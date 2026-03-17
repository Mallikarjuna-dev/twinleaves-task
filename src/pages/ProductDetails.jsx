import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/productApi'
import Loader from '../components/Loader'

export default function ProductDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    getProductById(id).then(setData)
  }, [id])

  if (!data) return <Loader />

  return (
    <div style={{ padding: 20 }}>
      <img src={data.image} width='200' />
      <h2>{data.name}</h2>
      <h3>₹ {data.price}</h3>
      <p>{data.description}</p>
    </div>
  )
}
