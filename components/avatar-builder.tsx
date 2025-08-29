"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Avatar {
  color: string
  outfit: string
  accessory: string
}

interface AvatarBuilderProps {
  avatar: Avatar
  onChange: (avatar: Avatar) => void
}

export default function AvatarBuilder({ avatar, onChange }: AvatarBuilderProps) {
  const colors = [
    { id: "blue", name: "Ocean Blue", class: "bg-blue-400" },
    { id: "green", name: "Forest Green", class: "bg-green-400" },
    { id: "purple", name: "Royal Purple", class: "bg-purple-400" },
    { id: "orange", name: "Sunset Orange", class: "bg-orange-400" },
    { id: "pink", name: "Cherry Pink", class: "bg-pink-400" },
  ]

  const outfits = [
    { id: "casual", name: "Casual", desc: "Comfortable everyday wear" },
    { id: "sporty", name: "Sporty", desc: "Active and energetic" },
    { id: "formal", name: "Formal", desc: "Professional and polished" },
    { id: "creative", name: "Creative", desc: "Artistic and expressive" },
  ]

  const accessories = [
    { id: "none", name: "None", desc: "Simple and clean" },
    { id: "glasses", name: "Glasses", desc: "Smart and focused" },
    { id: "hat", name: "Hat", desc: "Fun and playful" },
    { id: "headphones", name: "Headphones", desc: "Music lover" },
  ]

  const updateAvatar = (field: keyof Avatar, value: string) => {
    onChange({ ...avatar, [field]: value })
  }

  return (
    <div className="space-y-8">
      {/* Avatar Preview */}
      <div className="text-center">
        <div className="inline-block relative">
          <div
            className={`w-32 h-32 ${colors.find((c) => c.id === avatar.color)?.class} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold shadow-lg`}
          >
            {avatar.accessory === "glasses" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-6 border-2 border-white rounded-lg bg-transparent"></div>
              </div>
            )}
            {avatar.accessory === "hat" && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gray-800 rounded-full"></div>
            )}
            {avatar.accessory === "headphones" && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-full"></div>
            )}
            😊
          </div>
          <div className="text-sm text-muted-foreground">
            {outfits.find((o) => o.id === avatar.outfit)?.name} • {colors.find((c) => c.id === avatar.color)?.name}
          </div>
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Choose Your Color</Label>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <Button
              key={color.id}
              variant={avatar.color === color.id ? "default" : "outline"}
              className="h-auto p-3 flex flex-col items-center gap-2"
              onClick={() => updateAvatar("color", color.id)}
            >
              <div className={`w-8 h-8 ${color.class} rounded-full`}></div>
              <span className="text-xs">{color.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Outfit Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Choose Your Style</Label>
        <div className="grid grid-cols-2 gap-3">
          {outfits.map((outfit) => (
            <Card
              key={outfit.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                avatar.outfit === outfit.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => updateAvatar("outfit", outfit.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="font-semibold">{outfit.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{outfit.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Accessory Selection */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Add an Accessory</Label>
        <div className="grid grid-cols-2 gap-3">
          {accessories.map((accessory) => (
            <Card
              key={accessory.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                avatar.accessory === accessory.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => updateAvatar("accessory", accessory.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="font-semibold">{accessory.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{accessory.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
