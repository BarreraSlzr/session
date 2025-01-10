'use client'

import { PropsWithChildren, useEffect, useState } from "react"
import { ChatBubble } from "./chat-bubble"
import { LinkedInInfo } from "./linkedin-info"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "./ui/dialog"
import Link from "next/link"
import { Sun, Moon } from "lucide-react"
import { Button } from "./ui/button"

interface Props { chatVisible?: boolean };

export function ChatEmbbed({ chatVisible, children }: PropsWithChildren<Props>) {
    const [isChatVisible, setIsChatVisible] = useState(chatVisible || false)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => 
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Listener to handle changes in system preferences
        const handleSystemPreferenceChange = (event: MediaQueryListEvent) => {
            setIsDarkMode(event.matches);
        };

        // Apply initial dark mode class
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Add listener for system preference changes
        mediaQuery.addEventListener('change', handleSystemPreferenceChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemPreferenceChange);
        };
    }, [isDarkMode]);
    
    const toggleChat = () => setIsChatVisible(!isChatVisible)
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)


    return (<>
        {!isChatVisible && <ChatBubble onClick={toggleChat} />}
        <Dialog open={isChatVisible} onOpenChange={setIsChatVisible}>
            <DialogContent className="flex flex-col max-h-[calc(100vh_-_50px)] p-2 sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] bg-[hsl(var(--sofia-surface)_/_0.95)] backdrop-blur text-foreground">
                <DialogHeader className="flex flex-row justify-between">
                    <Link
                        href="https://www.linkedin.com/in/barreraslzr/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedInInfo className="mt-2">
                            <DialogTitle className="text-sm">
                                Visitar perfil de especialista
                            </DialogTitle>
                        </LinkedInInfo>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="self-end">
                        {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                    </Button>
                </DialogHeader>
                <div className="relative rounded-xl overflow-auto transition-colors">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    </>)
}