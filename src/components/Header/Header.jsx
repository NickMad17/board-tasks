import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent, NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react";
import {useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Header = () => {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Profile",
      path: '/profile',
      click () {
        navigate('/profile')
      }
    },
    {
      name: "Board",
      path: '/',
      click () {
        navigate('/')
      }
    },
    {
      name: "Settings",
      path: '/settings',
      click () {
        navigate('/settings')
      }
    },

    {
      name: "Log Out",
      path: "",
      click () {
        navigate('/')
      }
    }
  ];

  return (
      <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth='full' isBlurred={true}>
        <NavbarContent>
          <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
          <NavbarBrand>
            <NavLink to='/' className="font-bold text-foreground">BOARD</NavLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className='bg-foreground'>
          {menuItems?.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                    onClick={item?.click ? item.click : null}
                    className={`w-full ${item.path === location ? "text-primary" : item.name === "Log Out" ? "text-danger" : "text-background"} cursor-pointer`}
                    size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
  );
};

export default Header;