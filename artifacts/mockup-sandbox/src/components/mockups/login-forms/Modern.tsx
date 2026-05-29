import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Factory } from "lucide-react"

export function Modern() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans" dir="rtl">
      <Card className="w-full max-w-md border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
        <div className="h-2 w-full bg-blue-600"></div>
        <CardHeader className="space-y-3 pb-6 pt-8 px-8">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-2">
            <Factory className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">تسجيل الدخول</CardTitle>
          <CardDescription className="text-slate-500 text-base">
            مرحباً بك في نظام إدارة ورشة الألمنيوم
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-8 pb-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">البريد الإلكتروني</Label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                className="pl-3 pr-10 text-right h-11 border-slate-200 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-lg text-left" 
                dir="ltr"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">كلمة المرور</Label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium">نسيت كلمة المرور؟</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-3 pr-10 text-right h-11 border-slate-200 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-lg text-left"
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-8 pb-8 pt-0">
          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-medium shadow-sm transition-all hover:shadow-md">
            دخول
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}