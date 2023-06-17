import { useNavigate } from "@builder.io/qwik-city";
import { $ } from "@builder.io/qwik";

declare global {
    interface Document {
        startViewTransition?: (callback: () => void) => void;
    }
}


export function useCustomNavigate() {
    const nav = useNavigate();


    return $((url: string) => {
        if (document.startViewTransition) {
            console.log('executing with view transition')
            document.startViewTransition(() => {
                nav(url);
            })
        } else {
            nav(url);
        }
    })
}