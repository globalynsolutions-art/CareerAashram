import { BASE_URL } from '@/app/lib/constants'

export async function generateSitemaps() {
  // Total 4 sitemap files
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({ params }) {
  const id = Number(params.id)

  const start = id * 50000
  const end = start + 50000

  const products = await getProducts(
    `SELECT id, date FROM products WHERE id BETWEEN ${start} AND ${end}`
  )

  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.date,
  }))
}
