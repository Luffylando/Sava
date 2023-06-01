import { Link } from 'react-router-dom';
import { HeaderStyle, FooterStyle, LayoutWrapper, ChildrenWrapper, LinkStyle } from "./style";

const Layout = ({ children }: any) => {
    return (
        <LayoutWrapper>
            <HeaderStyle>
                <LinkStyle>
                    <Link to="/">Dashboard</Link>
                </LinkStyle>
                <LinkStyle>
                    <Link to="/articles">Articles</Link>
                </LinkStyle>
                <LinkStyle>
                    <Link to="/categories">Categories</Link>
                </LinkStyle>
                <LinkStyle>
                    <Link to="/tags">Tags</Link>
                </LinkStyle>
            </HeaderStyle>
            <ChildrenWrapper>
                {children}
            </ChildrenWrapper>
            <FooterStyle>FOOTER</FooterStyle>
        </LayoutWrapper>
    )
}

export default Layout;