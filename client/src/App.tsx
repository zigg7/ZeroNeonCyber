import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { CRTEffect } from "@/components/CRTEffect";
import { SoundToggle } from "@/components/SoundToggle";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CRTEffect>
        <SoundToggle />
        <Router />
        <Toaster />
      </CRTEffect>
    </QueryClientProvider>
  );
}

export default App;
