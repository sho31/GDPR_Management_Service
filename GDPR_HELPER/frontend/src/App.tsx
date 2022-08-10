import * as React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
export const App = () => (
  <ChakraProvider theme={theme}>
      <Router>
          <Routes>
              <Route path="/admin" element={<AdminDashboard/>} />
              <Route path="/user/:DataSubjectID" element={<UserDashboard/>} />
          </Routes>
      </Router>
  </ChakraProvider>
)
