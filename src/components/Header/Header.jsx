import {
  Avatar,
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
import Error from "@/components/Error.jsx";

const Header = () => {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      name: "Добавить задачу",
      path: '/new-task/notStatus',
      click() {
        navigate('/new-task/notStatus')
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
                    className={`w-full ${item.path === location ? "text-primary" : item.name === "Выйти" ? "text-danger" : item.name === 'Добавить задачу' ? "text-warning" : "text-background"} cursor-pointer`}
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