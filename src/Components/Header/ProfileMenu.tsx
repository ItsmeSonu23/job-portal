import { Menu, Avatar, Switch } from "@mantine/core"
import { IconMessageCircle, IconUserCircle, IconMoon, IconMoonStars, IconSun, IconLogout } from "@tabler/icons-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { removeUser } from "../../Slices/UserSlice"

/**
 * ProfileMenu Component
 * 
 * This component renders a dropdown menu for user profile actions and settings.
 * It displays the user's name and avatar, and provides access to various user-related features.
 * 
 * Features:
 * - Displays user's name and profile picture
 * - Dropdown menu with the following options:
 *   - Profile page link
 *   - Resume access
 *   - Messages
 *   - Dark mode toggle
 *   - Logout functionality
 * 
 * State Management:
 * - Uses Redux for user and profile data
 * - Local state for menu open/close
 * 
 * Props: None
 * 
 * @returns {JSX.Element} A dropdown menu component with user profile options
 */
export const ProfileMenu = () => {
    const [opened, setOpened] = useState(false)
    const user = useSelector((state:any)=>state.user)
    const profile = useSelector((state:any)=> state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /**
     * Handles user logout by dispatching removeUser action
     */
    const handleLogout = () => {
        dispatch(removeUser())
        navigate("/login")
    }

    return (
        <div className="">
            <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
                <Menu.Target>
                    <div className="flex cursor-pointer items-center gap-2 text-xl">
                        {/* Name of the user */}
                        <div className="max-xssm:hidden">{user.name}</div>
                        {/* Avatar displays user profile picture if available, falls back to default avatar */}
                        <Avatar src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png" } alt="it's  me" />
                    </div>
                </Menu.Target>

                <Menu.Dropdown onChange={() => setOpened(true)}>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item leftSection={<IconUserCircle size={14} />}>
                        <NavLink to={"/profile"}>Profile</NavLink>
                    </Menu.Item>
                    <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                        Resume
                    </Menu.Item>
                    <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                        Messages
                    </Menu.Item>
                    <Menu.Item
                        leftSection={<IconMoon size={14} />}
                        rightSection={
                            <Switch
                                size="md"
                                color="dark.4"
                                onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
                                offLabel={<IconMoonStars size={16} stroke={2.5} color="darkorchid" />}
                            />
                        }
                    >
                        DarkMode
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                        onClick={handleLogout}
                        color="darkorchid"
                        leftSection={<IconLogout size={14} />}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}