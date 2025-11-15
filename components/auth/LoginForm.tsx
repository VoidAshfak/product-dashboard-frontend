"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginRequest as LoginRequestValues } from '@/types/userType'
import { useAppDispatch } from '@/store/redux-hooks'
import { login } from '@/store/features/auth/authSlice'
import { useLoginMutation } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";
import {FormSchema} from '@/lib/schema'


export function LoginForm() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loginUser, {isLoading, isError}] = useLoginMutation();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const res = await loginUser(data).unwrap();
            if(res.success === false) {
                throw new Error(res.message);
            }
            dispatch(login(res));
            router.push('/');
        } catch (error) {
            throw new Error(error as string);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    Login
                </Button>
            </form>
        </Form>
    );
}
