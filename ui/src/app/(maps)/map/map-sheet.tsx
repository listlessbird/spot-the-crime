"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { SquarePen } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"></form>
    </Form>
  )
}

const formSchema = z.object({
  name: z.string(),
  type: z.string(),
  date: z.date(),
  // get this from address later
  latitude: z.number(),
  longitude: z.number(),
})

export function MapSheet({ ...props }) {
  const sheetForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      date: new Date(),
      latitude: 0,
      longitude: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(process.env.NEXT_PUBLIC_API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        crimeType: values.type,
        date: values.date,
        latitude: values.latitude,
        longitude: values.longitude,
      }),
    })
  }

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button className="w-full justify-start gap-2 mt-auto">
          <SquarePen className="h-4 w-4" />
          <span>Insert new data</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="z-50">
        <SheetHeader>
          <SheetTitle>Add a new case</SheetTitle>
          <SheetDescription>You can add new case data here</SheetDescription>
        </SheetHeader>
        <Form {...sheetForm}>
          <form onSubmit={sheetForm.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={sheetForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="name" className="text-right">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input id="name" className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="type"
                control={sheetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="type" className="text-right">
                        type
                      </FormLabel>
                      <FormControl>
                        <Input id="type" className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={sheetForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-fit">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="date" className="text-right">
                        Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />



              <Separator />
              <FormField
                name="latitude"
                control={sheetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="latitude" className="text-right">
                        Latitude
                      </FormLabel>
                      <FormControl>
                        <Input id="latitude" className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="longitude"
                control={sheetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="longitude" className="text-right">
                        Longitude
                      </FormLabel>
                      <FormControl>
                        <Input id="longitude" className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              {/* <FormField
                name="address"
                control={sheetForm.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="address" className="text-right">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Textarea id="address" className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )} */}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Submit</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
