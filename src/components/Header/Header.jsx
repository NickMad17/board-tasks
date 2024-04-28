import {
  Avatar, Chip,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/authProvider.js";
import {fetchAvatar} from "@/api/fetchAvatar.js";

const Header = () => {
  const {setSession} = useAuth()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {session} = useAuth()
  const userId = session?.split("_")?.at(0);
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    fetchAvatar(userId)
        .then(data => {
          setAvatar(data)
        })
  }, []);

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
      path: '/my-tasks',
      click() {
        navigate('/my-tasks')
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
        localStorage.removeItem('userId')
        setSession(null)
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
        <NavbarContent justify="center">
          <NavbarItem>
            {location === '/my-tasks' ?
                <Chip className='text-lg min-h-10' color="warning" variant="bordered" size='lg'>Мои задачи</Chip> : ''}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <NavLink to='/profile'>
              <Avatar src={avatar} className='mr-5'/>
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className='bg-foreground'>
          {menuItems?.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                    onClick={item?.click ? item.click : null}
                    className={`w-full text-xl ${item.path === location ? "text-warning" : item.name === "Выйти" ? "text-danger" : item.name === 'Мемы' ? "text-primary" : "text-background"} cursor-pointer`}
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