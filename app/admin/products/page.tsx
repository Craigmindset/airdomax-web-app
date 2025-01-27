import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const products = [
  { id: 1, name: "Product A", price: 19.99, stock: 100 },
  { id: 2, name: "Product B", price: 29.99, stock: 50 },
  { id: 3, name: "Product C", price: 39.99, stock: 75 },
]

export default function AdminProducts() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

