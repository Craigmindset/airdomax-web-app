"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import ReactCountryFlag from "react-country-flag"
import { MapPin } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function getCountryName(countryCode: string | undefined): string {
     if (!countryCode) return 'N/A';
     const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
     return regionNames.of(countryCode) || countryCode;
}

interface Company {
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

interface MarketplaceCardProps {
  company: Company
}

export function MarketplaceCard({ company }: MarketplaceCardProps) {
  const router = useRouter()

  if (!company) {
    return null; // Return null if company is undefined
  }

  const handleMessage = () => {
    toast({
      title: "Chat Opened",
      description: `You've started a conversation with ${company.name}.`,
    })
    router.push(`/dashboard/chat?companyId=${company.id}`)
  }

  return (
    <div className="bg-[#F3E5F5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4 w-full min-w-[250px] max-w-[350px] flex flex-col m-2">
      {/* Header section */}
      <div className="flex items-start mb-4">
        <Avatar className="h-10 w-10 bg-[#FFA726] mr-2">
          <AvatarImage src={company.avatar} alt={company.name} />
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <h3 className="font-semibold text-sm text-[#4A148C] truncate">{company.name}</h3>
          {/* Website removed */}
          <div className="flex items-center text-xs text-gray-700">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{getCountryName(company.location) || 'N/A'}</span>
            <ReactCountryFlag
              countryCode={company.location || ''}
              svg
              style={{
                width: '1em',
                height: '1em',
                marginLeft: '0.25rem'
              }}
              title={company.location || ''}
            />
          </div>
        </div>
      </div>

      {/* What We Do section */}
      <div className="mb-4 flex-grow">
        <h4 className="text-[#4A148C] text-sm font-semibold mb-2">What We Do:</h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-xs text-gray-600 line-clamp-4 cursor-pointer">
                {company.whatWeDo}
              </p>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p className="text-xs">{company.whatWeDo}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Additional Info sections */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div>
          <h4 className="text-[#4A148C] font-semibold mb-1">What we need:</h4>
          <p className="text-gray-600 line-clamp-2">{company.requirements}</p>
        </div>
        <div>
          <h4 className="text-[#4A148C] font-semibold mb-1">Target Market:</h4>
          <p className="text-gray-600 line-clamp-2">{company.targetMarket}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-2 mt-auto">
        <Button 
          className="flex-1 bg-white hover:bg-gray-50 text-[#4A148C] border border-[#4A148C] active:opacity-80 transition-opacity text-xs h-8"
          onClick={() => router.push(`/dashboard/my-page/${company.id}`)}
        >
          Visit our Page
        </Button>
        <Button 
          className="flex-1 bg-white hover:bg-gray-50 text-[#4A148C] border border-[#4A148C] active:opacity-80 transition-opacity text-xs h-8"
          onClick={handleMessage}
        >
          Contact us
        </Button>
      </div>
    </div>
  )
}

