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
    <div style={{ padding: 30, maxWidth: 500, margin: 'auto' }}>
      <img
        src={data.image}
        width='250'
        style={{ display: 'block', marginBottom: 20 }}
      />
      <h2>{data.name}</h2>
      <h3 style={{ color: 'green' }}>₹ {data.price}</h3>
      <p style={{ lineHeight: 1.6 }}>{data.description}</p>
    </div>
  )
}
