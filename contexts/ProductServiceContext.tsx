"use client"

import React, { createContext, useState, useContext } from 'react'

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
}

interface Service {
  id: string;
  type: string;
  description: string;
  cost: number;
  duration: number;
  images: string[];
}

interface MarketplaceCard {
  id: string;
  name: string;
  type: string;
  description: string;
  avatar: string;
  website?: string;
  location?: string;
  whatWeDo: string;
  requirements: string;
  targetMarket: string;
}

interface ProductServiceContextType {
  products: Product[];
  services: Service[];
  marketplaceCards: MarketplaceCard[];
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  addService: (service: Service) => void;
  addMarketplaceCard: (card: MarketplaceCard) => void;
}

const ProductServiceContext = createContext<ProductServiceContextType | undefined>(undefined)

export const ProductServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [marketplaceCards, setMarketplaceCards] = useState<MarketplaceCard[]>([])

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product])
  }

  const editProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => prevProducts.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ))
  }

  const addService = (service: Service) => {
    setServices(prevServices => [...prevServices, service])
  }

  const addMarketplaceCard = (card: MarketplaceCard) => {
    setMarketplaceCards(prevCards => [...prevCards, card])
  }

  return (
    <ProductServiceContext.Provider value={{ products, services, addProduct, editProduct, addService, marketplaceCards, addMarketplaceCard }}>
      {children}
    </ProductServiceContext.Provider>
  )
}

export const useProductService = () => {
  const context = useContext(ProductServiceContext)
  if (context === undefined) {
    throw new Error('useProductService must be used within a ProductServiceProvider')
  }
  return context
}

