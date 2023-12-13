import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/notFound/NotFound'
import { MainLayout } from './pages/mainLayout/MainLayout'
import MainApp from './components/main/RenderBooks'
import { Login } from './pages/authPage/Auth'
import { ResetPass } from './pages/resetPage/ResetPass'
import { Account } from './pages/account/Account'
import PrivateRoute from './pages/private/PrivateRoute'
import BookDetails from './components/main/BookDetails'
  
  function App() {
    return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPass />} />
          <Route path="/account" element={<PrivateRoute element={<Account />} />} />
          <Route path="/books/:isbn13" element={<BookDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

export default App
