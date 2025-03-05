"use client"
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, UserFormData } from "@/schemas/login/loginSchema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useLoader } from "@/hooks/useLoader";
import AuthLoader from "@/components/self/Loader";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function Login() {

    const [togglePassword, setTogglePassword] = useState(false)
    const { toast } = useToast()
    const { loading, toggleLoader } = useLoader(false);
    const router = useRouter();
    const form = useForm<UserFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: '',
            password: ''
        }
    })

    async function onSubmit(values: UserFormData) {
        toggleLoader(true)
        try {
            const response = await api.post('/auth/login', {
                username: values.name,
                password: values.password,
            }, { skipAuth: true });
            const token = response.data.access_token;

            useAuthStore.getState().setToken(token);
            localStorage.setItem("jwt_token", token);

            router.push('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast({
                    title: error.response?.data?.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Erro!",
                    description: "Erro não esperado, consulte o suporte.",
                    variant: "destructive",
                });
            }
        } finally {
            toggleLoader(false)
        }
    }

    return (
        <main className="flex h-screen w-screen items-center justify-center">
            <div className="flex min-h-96 flex-col items-center gap-3 rounded-xl bg-background px-10 py-5 shadow-2xl">
                <Image alt="logo" src="/logo.jpeg" width={200} height={200} />
                <h2 className="font-bold">FAÇA SEU LOGIN</h2>
                <h3 className="text-sm">Informe seu usuário e senha</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[350px] flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Usuário" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex rounded-lg border">
                                            <Input
                                                className={cn("border-none")}
                                                placeholder="Senha"
                                                {...field}
                                                type={togglePassword ? 'text' : "password"} />
                                            <Toggle
                                                className="border-none"
                                                variant={"outline"}
                                                onClick={() => setTogglePassword(!togglePassword)}>
                                                {togglePassword ? <EyeOff /> : <Eye />}
                                            </Toggle>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <Button className="w-full text-lg">Login</Button>
                    </form>
                </Form>
                <span className="text-xs">2025 © Gestão de Clientes</span>
            </div>
            {loading && (
                <AuthLoader />
            )}
        </main>
    );
}
