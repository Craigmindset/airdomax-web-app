import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const services = [
  { id: 1, name: "Service A", price: 99.99, duration: "1 hour" },
  { id: 2, name: "Service B", price: 149.99, duration: "2 hours" },
  { id: 3, name: "Service C", price: 199.99, duration: "3 hours" },
]

export default function AdminServices() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>${service.price.toFixed(2)}</TableCell>
              <TableCell>{service.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

