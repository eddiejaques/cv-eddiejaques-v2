import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudiesHub from './pages/CaseStudiesHub';
import CaseStudyDetail from './pages/CaseStudyDetail';
import BlogHub from './pages/BlogHub';
import BlogPostDetail from './pages/BlogPostDetail';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies" element={<CaseStudiesHub />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/blog" element={<BlogHub />} />
        <Route path="/blog/:slug" element={<BlogPostDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
