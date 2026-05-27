import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hammer } from "lucide-react"

export function Dark() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950" dir="rtl">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-slate-100 shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8 pt-10">
          <div className="mx-auto bg-slate-800/50 p-4 rounded-full border border-slate-700/50">
            <Hammer className="w-10 h-10 text-teal-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">ورشة الألمنيوم</CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              سجل الدخول لإدارة مشاريعك وعملائك
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right block text-slate-300">
              البريد الإلكتروني
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="text-right bg-slate-950 border-slate-700 text-slate-100 focus-visible:ring-teal-500 placeholder:text-slate-600 h-12"
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-right block text-slate-300">
                كلمة المرور
              </Label>
              <a href="#" className="text-sm text-teal-400 hover:text-teal-300 hover:underline">
                نسيت كلمة المرور؟
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              className="text-right bg-slate-950 border-slate-700 text-slate-100 focus-visible:ring-teal-500 h-12"
              dir="ltr"
            />
          </div>
        </CardContent>
        <CardFooter className="px-8 pb-10 pt-4">
          <Button className="w-full h-12 text-lg font-medium bg-teal-500 hover:bg-teal-400 text-slate-950">
            دخول
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
