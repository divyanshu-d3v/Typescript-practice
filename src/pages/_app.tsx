import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NotesProvider } from "@/utils/ContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotesProvider>
      <Component {...pageProps} />
    </NotesProvider>
  )
}
