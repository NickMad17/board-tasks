import {
  Avatar,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
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
      name: "Борд",
      path: '/',
      click() {
        navigate('/');
      }
    },
    {
      name: "Мои задачи",
      path: '/profile',
      click() {
        navigate('/profile')
      }
    },
    {
      name: "Идеи",
      path: '/ideas',
      click() {
        navigate('/ideas')
      }
    },
    {
      name: "Мемы",
      path: '/memes',
      click() {
        navigate('/memes');
      }
    },
    {
      name: "Настройки",
      path: '/settings',
      click() {
        navigate('/settings')
      }
    },

    {
      name: "Выйти",
      path: "",
      click() {
        navigate('/login')
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
            <NavLink to='/profile'>
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className='mr-5'/>
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className='bg-foreground'>
          {menuItems?.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                    onClick={item?.click ? item.click : null}
                    className={`w-full text-xl ${item.path === location ? "text-primary" : item.name === "Выйти" ? "text-danger" : item.name === 'Мемы' ? "text-warning" : "text-background"} cursor-pointer`}
                    size="lg"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
  );
};

export default Header;