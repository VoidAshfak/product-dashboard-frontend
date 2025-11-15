"use client";

import { Button } from "./ui/button";
import { useLogoutMutation } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";

const LogoutBtn = ({ title }: { title: string }) => {
    const router = useRouter();
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                onClick={handleLogout}
            >
                {title}
            </Button>
        </div>
    );
};

export default LogoutBtn;
