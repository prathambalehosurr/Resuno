import { RouterProvider } from "react-router-dom";
import { router } from './app.routes.jsx'
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { InterviewProvider } from "./features/interview/interview.context.jsx";
import { ThemeProvider } from "./context/ThemeContext";


function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
