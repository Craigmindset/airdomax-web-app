"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import ReactCountryFlag from "react-country-flag"
import { useProductService } from "@/contexts/ProductServiceContext"
import { Badge } from "@/components/ui/badge"

const SuggestionTextarea = ({ label, value, onChange, suggestions }) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const handleSuggestionClick = (suggestion: string) => {
    if (selectedSuggestions.includes(suggestion)) {
      const newValue = value.replace(new RegExp(`(^|, )${suggestion}(, |$)`, 'g'), '$1').replace(/, $/, '');
      onChange(newValue);
      setSelectedSuggestions(selectedSuggestions.filter(s => s !== suggestion));
    } else {
      const newValue = value ? `${value}, ${suggestion}` : suggestion;
      onChange(newValue);
      setSelectedSuggestions([...selectedSuggestions, suggestion]);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-xs text-gray-600">{label}</Label>
      <div className="relative">
        <Textarea
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {suggestions.map((suggestion, index) => (
            <Badge
              key={index}
              variant={selectedSuggestions.includes(suggestion) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedSuggestions.includes(suggestion)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary hover:text-primary-foreground"
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function MarketPostForm() {
  const router = useRouter()
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [requirements, setRequirements] = useState("")
  const [targetMarket, setTargetMarket] = useState("")
  const [postCategory, setPostCategory] = useState("")
  const [whatWeDo, setWhatWeDo] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const { addMarketplaceCard } = useProductService()

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
      whatWeDo.trim() !== "" &&
      postCategory !== "" &&
      requirements.trim() !== "" &&
      targetMarket.trim() !== ""
    )
  }, [name, whatWeDo, postCategory, requirements, targetMarket])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid) {
      toast({
        title: "Form Incomplete",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newCard = {
      id: Date.now().toString(),
      name,
      type: postCategory,
      description: requirements,
      avatar: avatarPreview || "/placeholder.svg",
      location,
      whatWeDo,
      requirements,
      targetMarket,
    }

    addMarketplaceCard(newCard)

    toast({
      title: "Market Post Created",
      description: `Your ${postCategory} market post has been successfully created.`,
    })
    router.push("/dashboard/marketplace")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="avatar" className="text-xs text-gray-600">Company Avatar</Label>
        <div className="flex items-center space-x-4">
          {avatarPreview ? (
            <div className="relative w-20 h-20">
              <img src={avatarPreview || "/placeholder.svg"} alt="Avatar preview" className="w-full h-full object-cover rounded-full" />
              <button
                type="button"
                onClick={() => {
                  setAvatar(null)
                  setAvatarPreview(null)
                }}
                className="absolute top-0 right-0 bg-white rounded-full p-1"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <label htmlFor="avatar-upload" className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400" />
            </label>
          )}
          <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-xs text-gray-600">Company Name*</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-xs text-gray-600">Location</Label>
        <div className="flex items-center space-x-2">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="GB">United Kingdom</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
              <SelectItem value="DE">Germany</SelectItem>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="JP">Japan</SelectItem>
              <SelectItem value="CN">China</SelectItem>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="BR">Brazil</SelectItem>
              <SelectItem value="NG">Nigeria</SelectItem>
            </SelectContent>
          </Select>
          {location && (
            <ReactCountryFlag
              countryCode={location}
              svg
              style={{
                width: '2em',
                height: '2em',
              }}
              title={location}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postCategory" className="text-xs text-gray-600">Post Category*</Label>
        <Select value={postCategory} onValueChange={setPostCategory} required>
          <SelectTrigger id="postCategory">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manufacturer">Manufacturer</SelectItem>
            <SelectItem value="distributor">Distributor</SelectItem>
            <SelectItem value="vetting-agent">Vetting Agent</SelectItem>
            <SelectItem value="retailer">Retailer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatWeDo" className="text-xs text-gray-600">What We Do* (Max 300 characters)</Label>
        <Textarea
          id="whatWeDo"
          value={whatWeDo}
          onChange={(e) => {
            if (e.target.value.length <= 300) {
              setWhatWeDo(e.target.value)
            }
          }}
          placeholder="Describe what your company does"
          required
          maxLength={300}
        />
        <p className="text-xs text-gray-500">{whatWeDo.length}/300 characters</p>
      </div>

      <div>
        <SuggestionTextarea
          label="What We Need*"
          value={requirements}
          onChange={setRequirements}
          suggestions={["Distributor", "Buyers", "Distributor and Buyer", "Manufacturer", "Retailers", "Suppliers", "Partners"]}
        />
      </div>

      <div>
        <SuggestionTextarea
          label="Target Market*"
          value={targetMarket}
          onChange={setTargetMarket}
          suggestions={["Africa", "Europe", "Asia", "United States", "Worldwide"]}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#5A2B9C] hover:bg-[#4a2482] text-white"
        disabled={!isFormValid}
      >
        Create Market Post
      </Button>
    </form>
  )
}

