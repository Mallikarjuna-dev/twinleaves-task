import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../api/productApi'
import Loader from '../components/Loader'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState(null)

  useEffect(() => {
    getProductById(id).then(setData)
  }, [id])

  if (!data) return <Loader />

  return (
    <div style={{ padding: 30, maxWidth: 500, margin: 'auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: 20,
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: 6,
        }}
      >
        ← Back to Products
      </button>
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
