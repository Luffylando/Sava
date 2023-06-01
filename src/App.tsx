import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Dashboard from './Pages/Dashboard';

import Articles from './Pages/Article';
import SingleArticle from './Pages/Article/Single';
import CreateArticle from './Pages/Article/Create';
import EditArticle from './Pages/Article/Edit';

import Categories from './Pages/Category';
import SingleCategory from './Pages/Category/Single';
import CreateCategory from './Pages/Category/Create';
import EditCategory from './Pages/Category/Edit';


import Tags from './Pages/Tag';
import SingleTag from './Pages/Tag/Single';
import EditTag from './Pages/Tag/Edit';
import CreateTag from './Pages/Tag/Create';

const App = () => {
   return (
      <Layout>
         <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* Articles */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/create" element={<CreateArticle />} />
            <Route path="/articles/:id" element={< SingleArticle />} />
            <Route path="/articles/edit/:id" element={< EditArticle />} />

            {/* Categories */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/create" element={<CreateCategory />} />
            <Route path="/categories/:id" element={< SingleCategory />} />
            <Route path="/categories/edit/:id" element={< EditCategory />} />

            {/* Tags */}
            <Route path="/tags" element={<Tags />} />
            <Route path="/tags/create" element={<CreateTag />} />
            <Route path="/tags/:id" element={< SingleTag />} />
            <Route path="/tags/edit/:id" element={< EditTag />} />
         </Routes>
      </Layout>
   );
};

export default App;