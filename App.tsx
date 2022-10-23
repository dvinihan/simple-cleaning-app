import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./components/Navigation";
import { StrictMode } from "react";
import { DiscardModalProvider } from "./context/DiscardModalContext";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <DiscardModalProvider>
                <Navigation />
              </DiscardModalProvider>
            </PaperProvider>
            <StatusBar />
          </SafeAreaProvider>
        </QueryClientProvider>
      </StrictMode>
    );
  }
}
