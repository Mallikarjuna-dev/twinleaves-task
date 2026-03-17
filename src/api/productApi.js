import axios from 'axios'

const mockProducts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 2 === 0 ? 'electronics' : 'fashion',
  price: Math.floor(Math.random() * 5000) + 500,
  image: 'https://via.placeholder.com/80',
  description: 'Demo description',
}))

const BASE_URL =
  'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products'

export const getProducts = async ({ page, search, category, sort }) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page,
        search,
        category,
        sort,
      },
      headers: {
        'x-internal-call': true,
      },
    })
    return response.data
  } catch (err) {
    console.log('API blocked → using mock', err)

    let filtered = [...mockProducts]

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (sort === 'asc') filtered.sort((a, b) => a.price - b.price)
    if (sort === 'desc') filtered.sort((a, b) => b.price - a.price)

    const pageSize = 10
    const start = (page - 1) * pageSize

    return {
      products: filtered.slice(start, start + pageSize),
      total: filtered.length,
    }
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        'x-internal-call': true,
      },
    })
    return response.data
  } catch (err) {
    console.log('API failed → using mock', err)
    return mockProducts.find((p) => p.id === +id)
  }
}
